# 第13章：附录——重构列表与坏味道速查表

## Core Idea
本书附录（重构列表 + 坏味道与重构手法速查表）是整套名录与气味映射的索引页，用于快速定位"哪个重构做什么、什么味道该配什么疗法"。

## Frameworks Introduced
- **重构列表（61 项全量索引）**：名称（英文/中文/章节），ch06–ch12 的分组出处见下
- **坏味道→常用重构映射**（速查表）：24 味 → 每个味对应 1~10 个最常见疗法

## Reference Tables

### 重构列表（按出现章节分组）
| 中文名 | 英文名 | 章节 |
|---|---|---|
| 提炼函数 / 内联函数 / 提炼变量 / 内联变量 / 改变函数声明 / 封装变量 / 变量改名 / 引入参数对象 / 函数组合成类 / 函数组合成变换 / 拆分阶段 | Extract Function / Inline Function / Extract Variable / Inline Variable / Change Function Declaration / Encapsulate Variable / Rename Variable / Introduce Parameter Object / Combine Functions into Class / Combine Functions into Transform / Split Phase | ch06 |
| 封装记录 / 封装集合 / 以对象取代基本类型 / 以查询取代临时变量 / 提炼类 / 内联类 / 隐藏委托关系 / 移除中间人 / 替换算法 | Encapsulate Record / Encapsulate Collection / Replace Primitive with Object / Replace Temp with Query / Extract Class / Inline Class / Hide Delegate / Remove Middle Man / Substitute Algorithm | ch07 |
| 搬移函数 / 搬移字段 / 搬移语句到函数 / 搬移语句到调用者 / 以函数调用取代内联代码 / 移动语句 / 拆分循环 / 以管道取代循环 / 移除死代码 | Move Function / Move Field / Move Statements into Function / Move Statements to Callers / Replace Inline Code with Function Call / Slide Statements / Split Loop / Replace Loop with Pipeline / Remove Dead Code | ch08 |
| 拆分变量 / 字段改名 / 以查询取代派生变量 / 将引用对象改为值对象 / 将值对象改为引用对象 | Split Variable / Rename Field / Replace Derived Variable with Query / Change Reference to Value / Change Value to Reference | ch09 |
| 分解条件表达式 / 合并条件表达式 / 以卫语句取代嵌套条件表达式 / 以多态取代条件表达式 / 引入特例 / 引入断言 | Decompose Conditional / Consolidate Conditional Expression / Replace Nested Conditional with Guard Clauses / Replace Conditional with Polymorphism / Introduce Special Case / Introduce Assertion | ch10 |
| 将查询函数和修改函数分离 / 函数参数化 / 移除标记参数 / 保持对象完整 / 以查询取代参数 / 以参数取代查询 / 移除设值函数 / 以工厂函数取代构造函数 / 以命令取代函数 / 以函数取代命令 | Separate Query from Modifier / Parameterize Function / Remove Flag Argument / Preserve Whole Object / Replace Parameter with Query / Replace Query with Parameter / Remove Setting Method / Replace Constructor with Factory Function / Replace Function with Command / Replace Command with Function | ch11 |
| 函数上移 / 字段上移 / 构造函数本体上移 / 函数下移 / 字段下移 / 以子类取代类型码 / 移除子类 / 提炼超类 / 折叠继承体系 / 以委托取代子类 / 以委托取代超类 | Pull Up Method / Pull Up Field / Pull Up Constructor Body / Push Down Method / Push Down Field / Replace Type Code with Subclasses / Remove Subclass / Extract Superclass / Collapse Hierarchy / Replace Subclass with Delegate / Replace Superclass with Delegate | ch12 |

### 坏味道 → 常用重构（速查表摘录）
| 坏味道 | 常用重构 |
|---|---|
| 神秘命名 Mysterious Name | 改变函数声明、变量改名、字段改名 |
| 重复代码 Duplicated Code | 提炼函数、移动语句、函数上移 |
| 过长函数 Long Function | 提炼函数、以查询取代临时变量、引入参数对象、保持对象完整、以命令取代函数、分解条件表达式、以多态取代条件表达式、拆分循环 |
| 过长参数列表 Long Parameter List | 以查询取代参数、保持对象完整、引入参数对象、移除标记参数、函数组合成类 |
| 全局数据 Global Data | 封装变量 |
| 可变数据 Mutable Data | 封装变量、拆分变量、移动语句、提炼函数、将查询函数和修改函数分离、移除设值函数、以查询取代派生变量、函数组合成类、函数组合成变换、将引用对象改为值对象 |
| 发散式变化 Divergent Change | 拆分阶段、搬移函数、提炼函数、提炼类 |
| 霰弹式修改 Shotgun Surgery | 搬移函数、搬移字段、函数组合成类、函数组合成变换、拆分阶段、内联函数、内联类 |
| 依恋情结 Feature Envy | 搬移函数、提炼函数 |
| 数据泥团 Data Clumps | 提炼类、引入参数对象、保持对象完整 |
| 基本类型偏执 Primitive Obsession | 以对象取代基本类型、以子类取代类型码、以多态取代条件表达式、提炼类、引入参数对象 |
| 重复的 switch Repeated Switches | 以多态取代条件表达式 |
| 循环语句 Loops | 以管道取代循环 |
| 冗赘的元素 Lazy Element | 内联函数、内联类、折叠继承体系 |
| 夸夸其谈通用性 Speculative Generality | 折叠继承体系、内联函数、内联类、改变函数声明、移除死代码 |
| 临时字段 Temporary Field | 提炼类、搬移函数、引入特例 |
| 过长的消息链 Message Chains | 隐藏委托关系、提炼函数、搬移函数 |
| 中间人 Middle Man | 移除中间人、内联函数、以委托取代超类、以委托取代子类 |
| 内幕交易 Insider Trading | 搬移函数、搬移字段、隐藏委托关系、以委托取代子类、以委托取代超类 |
| 过大的类 Large Class | 提炼类、提炼超类、以子类取代类型码 |
| 异曲同工的类 Alternative Classes with Different Interfaces | 改变函数声明、搬移函数、提炼超类 |
| 纯数据类 Data Class | 封装记录、移除设值函数、搬移函数、提炼函数、拆分阶段 |
| 被拒绝的遗赠 Refused Bequest | 函数下移、字段下移、以委托取代子类、以委托取代超类 |
| 注释 Comments | 提炼函数、改变函数声明、引入断言 |

## Mental Models
- **先查表再动手**：闻到味道→按上表选疗法→去对应章节读做法
- **一条手法治多味，一味用多条**：映射是"最常用"而非唯一解
- **页码无关化**：本技能以章节文件为粒度，不依赖原书页码

## Key Takeaways
1. 全量 61 项重构（ch06–ch12）都有名可查——先查速查表，再翻对应章节
2. 24 味坏味道→首选疗法的对应可以背下来（cheatsheet.md 提供决策版）
3. 常用组合：提炼+移动语句；多态+子类取代类型码；委托+隐藏委托关系

## Connects To
- **ch03**: 24 味坏味道的详细描述
- **ch06–ch12**: 各重构的动机/做法/范例
- **ch05**: 名录的记录格式
