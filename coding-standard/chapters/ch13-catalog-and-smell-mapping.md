# Ch13 — Appendix: Refactoring Catalog and Smell Mapping

## Core Idea
The book's appendix (the refactoring catalog plus the smell → refactoring quick reference) is the index page for the whole catalog and smell mapping: it locates quickly "what each refactoring does, and which remedy fits which smell".

## Frameworks Introduced
- **The refactoring catalog (a full index of all 61 techniques)**: name (English/Chinese/chapter); the grouping by ch06–ch12 is below
- **Smell → usual refactorings** (quick reference): 24 smells → each smell maps to its 1–10 most common remedies

## Reference Tables

### Refactoring Catalog (grouped by chapter of appearance)
| Technique | Chinese | ch |
|---|---|---|
| Extract Function / Inline Function / Extract Variable / Inline Variable / Change Function Declaration / Encapsulate Variable / Rename Variable / Introduce Parameter Object / Combine Functions into Class / Combine Functions into Transform / Split Phase | 提炼函数 / 内联函数 / 提炼变量 / 内联变量 / 改变函数声明 / 封装变量 / 变量改名 / 引入参数对象 / 函数组合成类 / 函数组合成变换 / 拆分阶段 | ch06 |
| Encapsulate Record / Encapsulate Collection / Replace Primitive with Object / Replace Temp with Query / Extract Class / Inline Class / Hide Delegate / Remove Middle Man / Substitute Algorithm | 封装记录 / 封装集合 / 以对象取代基本类型 / 以查询取代临时变量 / 提炼类 / 内联类 / 隐藏委托关系 / 移除中间人 / 替换算法 | ch07 |
| Move Function / Move Field / Move Statements into Function / Move Statements to Callers / Replace Inline Code with Function Call / Slide Statements / Split Loop / Replace Loop with Pipeline / Remove Dead Code | 搬移函数 / 搬移字段 / 搬移语句到函数 / 搬移语句到调用者 / 以函数调用取代内联代码 / 移动语句 / 拆分循环 / 以管道取代循环 / 移除死代码 | ch08 |
| Split Variable / Rename Field / Replace Derived Variable with Query / Change Reference to Value / Change Value to Reference | 拆分变量 / 字段改名 / 以查询取代派生变量 / 将引用对象改为值对象 / 将值对象改为引用对象 | ch09 |
| Decompose Conditional / Consolidate Conditional Expression / Replace Nested Conditional with Guard Clauses / Replace Conditional with Polymorphism / Introduce Special Case / Introduce Assertion | 分解条件表达式 / 合并条件表达式 / 以卫语句取代嵌套条件表达式 / 以多态取代条件表达式 / 引入特例 / 引入断言 | ch10 |
| Separate Query from Modifier / Parameterize Function / Remove Flag Argument / Preserve Whole Object / Replace Parameter with Query / Replace Query with Parameter / Remove Setting Method / Replace Constructor with Factory Function / Replace Function with Command / Replace Command with Function | 将查询函数和修改函数分离 / 函数参数化 / 移除标记参数 / 保持对象完整 / 以查询取代参数 / 以参数取代查询 / 移除设值函数 / 以工厂函数取代构造函数 / 以命令取代函数 / 以函数取代命令 | ch11 |
| Pull Up Method / Pull Up Field / Pull Up Constructor Body / Push Down Method / Push Down Field / Replace Type Code with Subclasses / Remove Subclass / Extract Superclass / Collapse Hierarchy / Replace Subclass with Delegate / Replace Superclass with Delegate | 函数上移 / 字段上移 / 构造函数本体上移 / 函数下移 / 字段下移 / 以子类取代类型码 / 移除子类 / 提炼超类 / 折叠继承体系 / 以委托取代子类 / 以委托取代超类 | ch12 |

### Smell → Usual Refactorings (quick-reference extract)
| Smell | Usual Refactorings |
|---|---|
| Mysterious Name（神秘命名） | Change Function Declaration, Rename Variable, Rename Field |
| Duplicated Code（重复代码） | Extract Function, Slide Statements, Pull Up Method |
| Long Function（过长函数） | Extract Function, Replace Temp with Query, Introduce Parameter Object, Preserve Whole Object, Replace Function with Command, Decompose Conditional, Replace Conditional with Polymorphism, Split Loop |
| Long Parameter List（过长参数列表） | Replace Parameter with Query, Preserve Whole Object, Introduce Parameter Object, Remove Flag Argument, Combine Functions into Class |
| Global Data（全局数据） | Encapsulate Variable |
| Mutable Data（可变数据） | Encapsulate Variable, Split Variable, Slide Statements, Extract Function, Separate Query from Modifier, Remove Setting Method, Replace Derived Variable with Query, Combine Functions into Class, Combine Functions into Transform, Change Reference to Value |
| Divergent Change（发散式变化） | Split Phase, Move Function, Extract Function, Extract Class |
| Shotgun Surgery（霰弹式修改） | Move Function, Move Field, Combine Functions into Class, Combine Functions into Transform, Split Phase, Inline Function, Inline Class |
| Feature Envy（依恋情结） | Move Function, Extract Function |
| Data Clumps（数据泥团） | Extract Class, Introduce Parameter Object, Preserve Whole Object |
| Primitive Obsession（基本类型偏执） | Replace Primitive with Object, Replace Type Code with Subclasses, Replace Conditional with Polymorphism, Extract Class, Introduce Parameter Object |
| Repeated Switches（重复的 switch） | Replace Conditional with Polymorphism |
| Loops（循环语句） | Replace Loop with Pipeline |
| Lazy Element（冗赘的元素） | Inline Function, Inline Class, Collapse Hierarchy |
| Speculative Generality（夸夸其谈通用性） | Collapse Hierarchy, Inline Function, Inline Class, Change Function Declaration, Remove Dead Code |
| Temporary Field（临时字段） | Extract Class, Move Function, Introduce Special Case |
| Message Chains（过长的消息链） | Hide Delegate, Extract Function, Move Function |
| Middle Man（中间人） | Remove Middle Man, Inline Function, Replace Superclass with Delegate, Replace Subclass with Delegate |
| Insider Trading（内幕交易） | Move Function, Move Field, Hide Delegate, Replace Subclass with Delegate, Replace Superclass with Delegate |
| Large Class（过大的类） | Extract Class, Extract Superclass, Replace Type Code with Subclasses |
| Alternative Classes with Different Interfaces（异曲同工的类） | Change Function Declaration, Move Function, Extract Superclass |
| Data Class（纯数据类） | Encapsulate Record, Remove Setting Method, Move Function, Extract Function, Split Phase |
| Refused Bequest（被拒绝的遗赠） | Push Down Method, Push Down Field, Replace Subclass with Delegate, Replace Superclass with Delegate |
| Comments（注释） | Extract Function, Change Function Declaration, Introduce Assertion |

## Mental Models
- **Locate before you act**: identify the smell → pick the remedy from the table above → read its mechanics in the corresponding chapter
- **One technique treats many smells, one smell takes many techniques**: the mapping is "most usual", not the only answer
- **Page-number independence**: this skill works at the granularity of chapter files and does not depend on the book's page numbers

## Key Takeaways
1. All 61 refactorings (ch06–ch12) are there by name — check the quick reference first, then open the matching chapter
2. The mapping from the 24 smells to their first-choice remedies can be memorized (cheatsheet.md offers a decision-oriented version)
3. Common combinations: Extract + Slide Statements; polymorphism + Replace Type Code with Subclasses; delegation + Hide Delegate

## Connects To
- **ch03**: detailed descriptions of the 24 smells
- **ch06–ch12**: motivation/mechanics/examples for each refactoring
- **ch05**: the catalog's record format
