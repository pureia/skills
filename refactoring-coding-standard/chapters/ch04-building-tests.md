# 第4章：构筑测试体系

## Core Idea
重构的前提是可靠的测试：测试必须**完全自动化、自我检验、频繁运行**。本章用行省/生产商（Province/Producer）示例演示如何在重构前为既有代码补上测试体系。

## Frameworks Introduced
- **自测试代码（Self-Testing Code）**：测试代码与产品代码一起入库，一键运行；"OK"即通过。
  - 何时用：任何重构之前；写新功能时同步写测试
  - 收益：把"找 bug"变成"run them and flush them out"——频繁运行 + 最近的改动 = 快速定位
- **红色/绿色灯**：测试失败=红条（此时不许重构），全通过=绿条；"回退到绿条"=撤销到最近一次全通过状态
- **测试夹具（fixture）设置**：三层结构 配置(settup)-检查(exercise)-验证(verify)（即 arrange-act-assert / given-when-then），外加常被忽视的拆除(teardown)阶段
- **风险驱动测试**：测试应聚焦"我最担心出错的部分"（复杂逻辑、边界条件），不测简单 getter/setter；测试过多反而导致测试不充分
- **为既有代码加测试的套路**：① 先随便填期望值 ② 用程序产生的真实值替换期望值 ③ 故意引入错误确认测试会失败 ④ 恢复错误

## Key Concepts
- **测试结构**（Mocha 示例）：`describe`（分组）+ `beforeEach`（每测试前创建全新夹具）+ `it`（用例，一次焦点验证）；assert/expect 风格断言
- **失败（failure）vs 错误（error）**：验证期断言不通过 vs 配置期抛异常（如 `doc.producers.forEach is not a function`）——后者常提示：输入不可信时该做校验/引入断言，可信数据源则不必过度防御
- **共享夹具反模式**：`const asia = ...` 提到外层作用域会让测试间互相污染、结果依赖运行顺序——用 `beforeEach` 重建夹具
- **不可变的共享夹具**：确定百分之百不可变时才可共享

## Mental Models
- **把目标写两遍**（代码一遍、测试一遍）——要犯两遍同样的错才能骗过检测器
- **程序公敌思维**：测试时积极思考如何破坏代码，这种思维提高生产力
- **测试覆盖率不能衡量测试质量**：好的测试集的标准是主观的——"有人引入 bug，我有多大自信测试能揪出来？"

## Anti-patterns
- **坚持"测试所有 public 函数"**：大量无效测试掩盖真正的风险
- **追求完美测试而迟迟不写**："编写未臻完善的测试并经常运行，好过对完美测试的无尽等待"
- **共享可变夹具**：测试结果依赖运行顺序，是"最恶心的 bug"之一
- **一个 it 里塞多个断言**：第一个断言失败会掩盖重要错误信息（紧密相关的除外）

## Code Examples
```javascript
describe('province', function() {
  let asia;
  beforeEach(function() {
    asia = new Province(sampleProvinceData()); // 每次全新夹具
  });
  it('shortfall', function() {
    expect(asia.shortfall).equal(5);
  });
});
```
- **What it demonstrates**: 标准夹具 + 独立测试；`sampleProvinceData()` 提供 {name:"Asia", producers:[{cost:10,production:9},...], demand:30, price:20}

## Worked Example
边界条件探测（对既有代码加测试的完整实践）：
1. 生产者为空集合 → shortfall=30, profit=0
2. demand=0 → shortfall=-25, profit=0；demand=-1 → shortfall=-26, profit=-10（并追问：负需求有意义吗？设值函数该抛错还是归零？）
3. 空字符串 demand → 结果为 NaN（暴露 parseInt 行为）
4. `producers: ""` 字符串 → 得到 `TypeError: forEach is not a function`——分清"失败"与"错误"；若输入来自外部服务才需要校验，内部可信源加校验反而造成重复验证
5. 每个边界测试引发的思考，往往比测试本身更值钱

## Key Takeaways
1. 测试必须自我检验（不用人盯输出），否则耗费大量时间比对
2. 频繁运行：处理的代码对应测试至少几分钟跑一次；全部测试每天至少一次
3. 遇到 bug：先写一个能复现它的测试，测试通过才算修完
4. 重构不改变可观测行为——若边界测试超出可观测范畴（如错误处理），重构前写的可能要删掉
5. 少量测试往往就足以带来惊人收益；别让覆盖率指标绑架你

## Connects To
- **Ch 1**: 示例中的"先测试再重构"第一步
- **Ch 2**: 自测试代码是重构的基石；TDD（测试-编码-重构循环）
- **Ch 6**: 引入断言（为"假设不成立就快速失败"服务）
- **Ch 10**: 引入断言重构的正式做法
