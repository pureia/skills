# Ch03 — Bad Smells in Code (24 Smells)

## Core Idea
This chapter gives 24 bad smells as radar signals for refactoring: not a defect list, but an index that says “smell this and these are the refactorings to think of”. Every smell corresponds to one or more refactorings, known as its “remedy”.

## Frameworks Introduced
- **The two kinds of smell → remedy correspondence**: every section is “symptom → preferred refactoring → handling of variants”. When you meet a smell, use the cheatsheet's “smell → remedy” first-reaction table to locate the preferred remedy; for the complete mapping, consult the ch13 quick-reference table.

## Key Concepts (24 smells at a glance)
- **Mysterious Name（神秘命名）**: unclear naming → Change Function Declaration, Rename Variable, Rename Field; being unable to think of a good name often points to a deeper design problem
- **Duplicated Code（重复代码）**: the same expression twice in one class → Extract Function; similar but not identical → Slide Statements and then Extract Function; across different subclasses → Pull Up Method
- **Long Function（过长函数）**: long functions are the hardest to change; 99% of the time use Extract Function; when parameters/temporary variables get in the way, first use Replace Temp with Query, Introduce Parameter Object or Preserve Whole Object; the ultimate weapon is Replace Function with Command
- **Long Parameter List（过长参数列表）**: Replace Parameter with Query, Preserve Whole Object, Introduce Parameter Object, Remove Flag Argument; several functions sharing parameters → Combine Functions into Class
- **Global Data（全局数据）**: changeable from any corner and impossible to trace → Encapsulate Variable, then move functions/data into a module to narrow the scope
- **Mutable Data（可变数据）**: updated in one place while another place expects a different value → Encapsulate Variable, Split Variable, Slide Statements + Extract Function to separate side effects, Separate Query from Modifier, Remove Setting Method, Replace Derived Variable with Query; to limit how much code can be modified → Combine Functions into Class/Transform, Change Reference to Value
- **Divergent Change（发散式变化）**: the same module changes in different directions for different reasons → Split Phase, Move Function, Extract Function, Extract Class
- **Shotgun Surgery（霰弹式修改）**: the opposite of Divergent Change — one kind of change requires small edits scattered across many classes → Move Function/Move Field to gather them together, Combine Functions into Class/Transform, Split Phase, Inline Function/Inline Class
- **Feature Envy（依恋情结）**: a function interacts with another module's data far more than with its own → Move Function (“put it where the module that owns most of the data it uses is”); the GoF Strategy/Visitor patterns are the exception that holds Divergent Change at bay
- **Data Clumps（数据泥团）**: data items that always appear together → Extract Class + Introduce Parameter Object/Preserve Whole Object; when removing one item makes the rest meaningless, it is time to build an object
- **Primitive Obsession（基本类型偏执）**: using primitives for money, coordinates and ranges → Replace Primitive with Object; type codes → Replace Type Code with Subclasses + Replace Conditional with Polymorphism; “stringly typed” variables are the worst-hit area
- **Repeated Switches（重复的 switch）**: the same condition drives the same branches in several places → Replace Conditional with Polymorphism
- **Loops（循环语句）**: poor readability → Replace Loop with Pipeline (filter/map and so on)
- **Lazy Element（冗赘的元素）**: the name is the implementation / an empty-shell function or class → Inline Function, Inline Class; inside an inheritance hierarchy → Collapse Hierarchy
- **Speculative Generality（夸夸其谈通用性）**: hooks/parameters/abstractions added for “we will need it some day” → Collapse Hierarchy, Inline Function/Class, Change Function Declaration; when the only user is a test case → delete the tests + Remove Dead Code
- **Temporary Field（临时字段）**: a field used only in certain circumstances → Extract Class + Move Function; for situations where “the variable is not legal” → Introduce Special Case
- **Message Chains（过长的消息链）**: a.getB().getC().getD() → Hide Delegate; better: Extract Function to put the chain-using pattern inside and then Move Function; some people treat any function chain as a smell — not endorsed
- **Middle Man（中间人）**: half the interface just delegates → Remove Middle Man; when only a few fields are used → Inline Function; for other behavior → Replace Superclass with Delegate/Replace Subclass with Delegate
- **Insider Trading（内幕交易）**: modules exchanging large amounts of data in private → Move Function/Move Field, Hide Delegate; inheritance conspiring together → Replace Subclass with Delegate/Replace Superclass with Delegate
- **Large Class（过大的类）**: too many fields or too much code → Extract Class (variables sharing a prefix/suffix are the signal), Extract Superclass, Replace Type Code with Subclasses; watch which subset of the functionality the users actually use
- **Alternative Classes with Different Interfaces（异曲同工的类）**: should be replaceable for one another but the interfaces disagree → Change Function Declaration to unify the signatures, Move Function to align the protocols, Extract Superclass to compensate for the duplication
- **Data Class（纯数据类）**: nothing but fields + accessor methods → Encapsulate Record, Remove Setting Method, Move Function/Extract Function to move behavior into it; exception: an immutable intermediate data structure (the product of Split Phase) needs no encapsulation
- **Refused Bequest（被拒绝的遗赠）**: the subclass does not want what it inherits → the traditional remedies (Push Down Method/Push Down Field into a sibling, abstracting the superclass) are used only when they cause confusion; when what is refused is the interface rather than the implementation, the smell is strong → Replace Subclass with Delegate/Replace Superclass with Delegate
- **Comments（注释）**: comments are a sweet smell, but they are often used as a deodorant → a comment explaining what the code does → Extract Function; explaining behavior → Change Function Declaration to rename; stating a requirement specification → Introduce Assertion

## Mental Models
- **A bad smell is not a bug; it is a signal of “the change will take effort and may introduce a bug”**: not all messy code has to be changed — it is only worth it when the code needs to be modified or understood
- **Divergent Change vs Shotgun Surgery**: “one class changes for many different reasons” vs “one kind of change is scattered across many classes” — two faces of the same coupling problem
- **Smells are classified by the “direction of change”**: naming, duplication, over-length, coupling (Feature Envy/Insider Trading/Message Chains), data (Global Data/Mutable Data/Data Clumps/Primitive Obsession), conditions and loops, inheritance misuse

## Anti-patterns
- **Treating comments as a deodorant**: only bad code needs comments; refactor first so that the comment becomes redundant
- **Unconditional opposition to conditional statements**: the real enemy is the Repeated Switch, not all conditional logic
- **Treating every function chain as a smell**: judge calmly and coolly — hiding too much also creates Middle Men
- **Replacing every switch with polymorphism**: polymorphism has a cost (an extra layer of indirection); only cut into repeated branch selections

## Worked Example
The route for handling a Large Class: seeing the same-prefix fields `depositAmount`/`depositCurrency` → Extract Class → look for Feature Envy in the new class → move behavior into the new class → the Data Clumps find a home, and the new object's “small society” begins to smell fragrant.
The route for handling a Long Function: add comments first → the comments point to the semantic distance → extract; too many parameters → Replace Temp with Query → Introduce Parameter Object → Replace Function with Command.

## Key Takeaways
1. See these features and jump straight to the remedy: duplication → extract; over-length → locate with comments + extract; many parameters → turn them into an object/a query; type-code switch → polymorphism
2. Before changing anything, ask “which direction of change does this smell correspond to”, then pick the preferred remedy from the cheatsheet's first-reaction table (see the ch13 quick-reference table for the full set)
3. One fix is not necessarily one remedy: gathering with inline first and then extracting and splitting is a common combination
4. The smell list is a memory index — real code requires judging how strong the smell is in context

## Connects To
- **ch13**: the complete quick-reference table of smells → usual refactorings
- **ch06–ch12**: the detailed mechanics of each remedy (refactoring)
- **ch01**: the Long Function, Duplicated Code, Comments and Repeated Switches of the example
- **ch02**: when to refactor — smelling something does not mean you have to change it right away
