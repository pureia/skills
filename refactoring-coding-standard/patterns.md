# 重构手法全览（patterns.md）

> 本技能全部 **61 项**重构手法。每项格式：**中文名（English）** — 何时用 | 怎么做 | 取舍。各分组「##」标题标注所属章节与数量，详细做法见 `chapters/ch06–ch12`。

## 第一组（Ch6）— 11 项 — [ch06](chapters/ch06-first-set-of-refactorings.md)
- **提炼函数（Extract Function）** — 需要浏览才懂的一段代码 | 按"做什么"命名成函数，处理越界变量作参数/查询 | 短函数依赖好命名；性能罕见受损
- **内联函数（Inline Function）** — 函数体与名字一样清晰或只剩一个调用点 | 函数体逐段替换调用点后删除 | 反向：提炼函数只用于"值得留"的函数
- **提炼变量（Extract Variable）** — 复杂表达式/条件难读或需复用 | 无副作用后声明变量并替换 | 复用而非常量时优先提炼函数
- **内联变量（Inline Variable）** — 变量名没比表达式表达更多 | 单次赋值且无副作用时替换并删除 | 常量可保留；挡住提炼一律内联
- **改变函数声明（Change Function Declaration）** — 改名/增删参数/改类型 | 直接式改签名+调用者；需要迁移时旧声明转发壳 | 公开 API 必须迈步迁移
- **封装变量（Encapsulate Variable）** — 全局/大范围可变数据 | 取值/设值函数收口访问 | 所有修改都经函数才能监控
- **变量改名（Rename Variable）** — 变量名与含义不符 | 小作用域查找替换；大作用域先封装 | 查询型命名（aFoo）对动态语言重要
- **引入参数对象（Introduce Parameter Object）** — 参数总是成对出现 | 建值对象，改签名与调用点 | 参数表变短，后续行为可搬入
- **函数组合成类（Combine Functions into Class）** — 多个函数操弄同一组数据 | 数据+函数收进类/字段 | 有状态用类；类空壳化则内联
- **函数组合成变换（Combine Functions into Transform）** — 只读数据的多步计算 | 建变换函数逐步吸收逻辑 | 不可变数据选变换更简单
- **拆分阶段（Split Phase）** — 一段函数做两件不相关的事 | 提炼第二阶段，用不可变中间对象沟通 | 中间结构要不可修改

## 封装（Ch7）— 9 项 — [ch07](chapters/ch07-encapsulation.md)
- **封装记录（Encapsulate Record）** — 嵌套记录被到处读写 | 包成类+取值/设值函数 | 纯数据类第一步
- **封装集合（Encapsulate Collection）** — 集合裸暴露可被任意增删 | getter 返回只读视图 + add/remove 方法 | 永远不返回内部集合引用
- **以对象取代基本类型（Replace Primitive with Object）** — 领域值裸用基本类型 | 建值对象，行为迁入 | 显示/换算逻辑随之聚拢
- **以查询取代临时变量（Replace Temp with Query）** — 临时变量阻碍提炼 | 无副作用时改查询函数 | 提炼更简单、参数更少
- **提炼类（Extract Class）** — 类中部分字段/方法独立变化 | 建新类，先搬字段再搬方法 | 同前缀字段组是信号
- **内联类（Inline Class）** — 类只剩一个函数/无独立价值 | 逐个搬走字段方法后删除 | 与提炼类互为反向
- **隐藏委托关系（Hide Delegate）** — 消息链/远隔对象耦合 | 加委托方法简化客户端 | 过度隐藏会造中间人
- **移除中间人（Remove Middle Man）** — 一半接口都是转发 | 客户端直连被委托对象 | 用嗅觉平衡隐藏/移除
- **替换算法（Substitute Algorithm）** — 换个更清晰的实现 | 新旧并存对比输出后删除 | 别一步重写

## 搬移特性（Ch8）— 9 项 — [ch08](chapters/ch08-moving-features.md)
- **搬移函数（Move Function）** — 函数放错了宿主 | 搬到"拥有最多所用数据"的模块，委托转发过渡 | 跨模块注意私有可见性
- **搬移字段（Move Field）** — 字段总与别处数据一起变 | 先搬字段再搬使用函数 | 新宿主建字段渐进迁移
- **搬移语句到函数（Move Statements into Function）** — 语句应属被调函数 | 汇集后移植进函数 | 消除重复
- **搬移语句到调用者（Move Statements to Callers）** — 语句只对部分调用者适用 | 剪出后逐调用点复制 | 多调用者相同→参数化
- **以函数调用取代内联代码（Replace Inline Code with Function Call）** — 代码与已有函数等价 | 直接换调用；不贴切先改函数 | 检查语义一致
- **移动语句（Slide Statements）** — 相关代码该放在一起 | 确认无副作用依赖后整体搬移 | 为提炼铺路
- **拆分循环（Split Loop）** — 一个循环做多件事 | 每关注点一个循环 | 别为性能顾虑，管道可回头
- **以管道取代循环（Replace Loop with Pipeline）** — 循环看不清数据处理 | filter/map 逐步替代 | 意图立刻可见
- **移除死代码（Remove Dead Code）** — 无调用者的代码 | 清理引用（含注释/反射）后删除 | 版本控制已留档

## 重新组织数据（Ch9）— 5 项 — [ch09](chapters/ch09-organizing-data.md)
- **拆分变量（Split Variable）** — 一个变量承载多种含义 | 每含义一变量 | 累加器/循环变量例外
- **字段改名（Rename Field）** — 字段名过时 | 内部直接改；公开用迁移转发 | 改名传播成本可控
- **以查询取代派生变量（Replace Derived Variable with Query）** — 派生数据被缓存 | 删除更新路径，实时计算 | 性能敏感可复核缓存
- **将引用对象改为值对象（Change Reference to Value）** — 小对象被多处内部引用 | 设值改为整体替换+equals/hashCode | 更新=new 最稳
- **将值对象改为引用对象（Change Value to Reference）** — 大对象需共享身份/缓存 | 建仓储按 ID 取实例 | 克隆与身份矛盾时用引用

## 简化条件逻辑（Ch10）— 6 项 — [ch10](chapters/ch10-simplifying-conditional-logic.md)
- **分解条件表达式（Decompose Conditional）** — 条件与分支体太长 | 条件与分支各成函数 | 意图先行
- **合并条件表达式（Consolidate Conditional Expression）** — 多个条件同结果 | && / || 合并 | 顺序敏感的别合并
- **以卫语句取代嵌套条件表达式（Replace Nested Conditional with Guard Clauses）** — 嵌套迷宫 | 特例取反早退 | 主线>特例才卫语句
- **以多态取代条件表达式（Replace Conditional with Polymorphism）** — 重复 switch | 子类覆写或双分派 | 单一 switch 不必要
- **引入特例（Introduce Special Case）** — 到处判 null/特值 | 特例类统一默认行为 | 减少条件漂泊
- **引入断言（Introduce Assertion）** — 依赖不变量 | 加 assert 说明假设 | 不做业务逻辑

## 重构 API（Ch11）— 10 项 — [ch11](chapters/ch11-refactoring-apis.md)
- **将查询函数和修改函数分离（Separate Query from Modifier）** — 函数又查又改 | 复制出查询，副作用收进修改 | 调用者不会被意外污染
- **函数参数化（Parameterize Function）** — 两函数只差字面量 | 合并成带参函数 | 行为模式不同别硬合并
- **移除标记参数（Remove Flag Argument）** — 参数只选路径 | 拆成具名函数 | 调用点自解释
- **保持对象完整（Preserve Whole Object）** — 从对象拆字段传参 | 直接传对象 | 真聚合才有意义
- **以查询取代参数（Replace Parameter with Query）** — 实参是调用对象属性 | 函数内查询 | 减少调用者负担
- **以参数取代查询（Replace Query with Parameter）** — 函数内直取全局/远端 | 参数注入 | 可测性优先
- **移除设值函数（Remove Setting Method）** — 字段应构造后不变 | 移删 setter | 不可变语义
- **以工厂函数取代构造函数（Replace Constructor with Factory Function）** — 构造语义不明/需选类型 | 建 createXxx 返回实例 | 可返回子类型
- **以命令取代函数（Replace Function with Command）** — 函数太长/参数太多 | 建类分步执行 | 复杂算法收纳盒
- **以函数取代命令（Replace Command with Function）** — 命令只剩一个方法 | 折叠为普通函数 | 过度结构要拆

## 处理继承关系（Ch12）— 11 项 — [ch12](chapters/ch12-dealing-with-inheritance.md)
- **函数上移（Pull Up Method）** — 子类相同函数 | 移到超类 | 细节差异用模板方法
- **字段上移（Pull Up Field）** — 子类相同字段 | 移超类 | 构造参数直达
- **构造函数本体上移（Pull Up Constructor Body）** — 子类构造公共段 | 上移+参数对象 | 减少重复
- **函数下移（Push Down Method）** — 超类函数只对某子类有意义 | 复制到子类删超类 | 超类抽象化前清理
- **字段下移（Push Down Field）** — 字段仅部分子类用 | 移到子类 | 超类瘦身
- **以子类取代类型码（Replace Type Code with Subclasses）** — 类型码驱动行为 | 工厂+子类+覆写 | 分支碎小则不必
- **移除子类（Remove Subclass）** — 子类无独立价值 | 折叠进超类 | 结构瘦身
- **提炼超类（Extract Superclass）** — 两类别共同部分 | 建抽象超类上移 | 可选"组合"代替
- **折叠继承体系（Collapse Hierarchy）** — 层次失去意义 | 合并后删除子类 | 抽干即折叠
- **以委托取代子类（Replace Subclass with Delegate）** — 子类拒绝接口/多维变化 | 委托字段+转发 | 拒绝"是"的伪装
- **以委托取代超类（Replace Superclass with Delegate）** — 超类接口泄露过多 | 聚合+需要的转发 | 组合胜过继承
