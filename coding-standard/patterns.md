# Refactoring Techniques (61)

> All **61** refactoring techniques in this skill. Each entry: **English name（中文名）** — When | How | Tradeoff. Each group's `##` heading marks its chapter and count; for detailed mechanics see `chapters/ch06–ch12`.

**Jump table** — each technique carries a stable id `T-chNN.n`; cite it, and jump by group:

- **First Set** (ch06) — T-06.1 – T-06.11 → [ch06](chapters/ch06-first-set-of-refactorings.md)
- **Encapsulation** (ch07) — T-07.1 – T-07.9 → [ch07](chapters/ch07-encapsulation.md)
- **Moving Features** (ch08) — T-08.1 – T-08.9 → [ch08](chapters/ch08-moving-features.md)
- **Organizing Data** (ch09) — T-09.1 – T-09.5 → [ch09](chapters/ch09-organizing-data.md)
- **Simplifying Conditional Logic** (ch10) — T-10.1 – T-10.6 → [ch10](chapters/ch10-simplifying-conditional-logic.md)
- **Refactoring APIs** (ch11) — T-11.1 – T-11.10 → [ch11](chapters/ch11-refactoring-apis.md)
- **Dealing with Inheritance** (ch12) — T-12.1 – T-12.11 → [ch12](chapters/ch12-dealing-with-inheritance.md)

## First Set (ch06) — 11 techniques — [ch06](chapters/ch06-first-set-of-refactorings.md)
- **T-06.1 · Extract Function（提炼函数）** — When: a stretch of code you have to browse through to understand | How: name it as a function by "what it does"; handle out-of-scope variables as parameters/queries | Tradeoff: short functions depend on good naming; performance is rarely harmed
- **T-06.2 · Inline Function（内联函数）** — When: the body is as clear as the name, or only one call site is left | How: replace the call site with the body piece by piece, then delete | Tradeoff: the reverse: use Extract Function only on functions "worth keeping"
- **T-06.3 · Extract Variable（提炼变量）** — When: a complex expression/condition is hard to read or needs reuse | How: after confirming no side effects, declare a variable and replace | Tradeoff: when it is for reuse rather than a constant, prefer Extract Function
- **T-06.4 · Inline Variable（内联变量）** — When: the variable name expresses no more than the expression | How: with a single assignment and no side effects, replace and delete | Tradeoff: constants may stay; anything that blocks an extraction should always be inlined
- **T-06.5 · Change Function Declaration（改变函数声明）** — When: renaming / adding or removing parameters / changing types | How: change the signature and callers directly; when migration is needed, an old declaration as a forwarding shell | Tradeoff: public APIs must be migrated step by step
- **T-06.6 · Encapsulate Variable（封装变量）** — When: global / widely scoped mutable data | How: funnel access through getting/setting functions | Tradeoff: only when every modification goes through functions can you monitor it
- **T-06.7 · Rename Variable（变量改名）** — When: the variable name no longer matches its meaning | How: find-and-replace in a small scope; encapsulate first in a large scope | Tradeoff: query-style naming (aFoo) matters for dynamic languages
- **T-06.8 · Introduce Parameter Object（引入参数对象）** — When: parameters that always travel together | How: build a value object, change the signature and the call sites | Tradeoff: the parameter list gets shorter, and behavior can move into it later
- **T-06.9 · Combine Functions into Class（函数组合成类）** — When: several functions manipulate the same group of data | How: gather the data + functions into a class/fields | Tradeoff: use a class when there is state; if the class becomes an empty shell, inline it
- **T-06.10 · Combine Functions into Transform（函数组合成变换）** — When: multi-step computation over read-only data | How: build a transform function that absorbs the logic step by step | Tradeoff: for immutable data, a transform is simpler
- **T-06.11 · Split Phase（拆分阶段）** — When: one function does two unrelated things | How: extract the second phase, communicating through an immutable intermediate object | Tradeoff: the intermediate structure must be unmodifiable

## Encapsulation (ch07) — 9 techniques — [ch07](chapters/ch07-encapsulation.md)
- **T-07.1 · Encapsulate Record（封装记录）** — When: a nested record is read and written everywhere | How: wrap it in a class + getting/setting functions | Tradeoff: the first step for a Data Class
- **T-07.2 · Encapsulate Collection（封装集合）** — When: a collection is exposed raw and can be added to or removed from at will | How: the getter returns a read-only view + add/remove methods | Tradeoff: never return a reference to the internal collection
- **T-07.3 · Replace Primitive with Object（以对象取代基本类型）** — When: domain values are used raw as primitives | How: build a value object and move the behavior in | Tradeoff: display/conversion logic gathers there along with it
- **T-07.4 · Replace Temp with Query（以查询取代临时变量）** — When: a temporary variable blocks extraction | How: when there are no side effects, turn it into a query function | Tradeoff: extraction gets simpler and takes fewer parameters
- **T-07.5 · Extract Class（提炼类）** — When: some fields/methods in a class change independently | How: create a new class, moving fields first and then methods | Tradeoff: groups of fields sharing a prefix are the signal
- **T-07.6 · Inline Class（内联类）** — When: the class has only one function left / no independent value | How: move its fields and methods away one by one, then delete it | Tradeoff: the reverse of Extract Class
- **T-07.7 · Hide Delegate（隐藏委托关系）** — When: message chains / coupling to a distant object | How: add delegating methods to simplify the client | Tradeoff: hiding too much creates a Middle Man
- **T-07.8 · Remove Middle Man（移除中间人）** — When: half the interface is just forwarding | How: the client connects directly to the delegated object | Tradeoff: use your nose to balance hiding against removing
- **T-07.9 · Substitute Algorithm（替换算法）** — When: swapping in a clearer implementation | How: run the old and the new side by side, compare the output, then delete | Tradeoff: don't rewrite in one step

## Moving Features (ch08) — 9 techniques — [ch08](chapters/ch08-moving-features.md)
- **T-08.1 · Move Function（搬移函数）** — When: the function is hosted in the wrong place | How: move it to the module that "owns the most of the data it uses", using delegation/forwarding as a transition | Tradeoff: watch private visibility when crossing modules
- **T-08.2 · Move Field（搬移字段）** — When: the field always changes together with data elsewhere | How: move the field first, then move the functions that use it | Tradeoff: create the field in the new host and migrate gradually
- **T-08.3 · Move Statements into Function（搬移语句到函数）** — When: the statements belong to the function being called | How: gather them together and transplant them into the function | Tradeoff: eliminates duplication
- **T-08.4 · Move Statements to Callers（搬移语句到调用者）** — When: the statements apply to only some callers | How: cut them out, then copy them to each call site | Tradeoff: the same for many callers → parameterize
- **T-08.5 · Replace Inline Code with Function Call（以函数调用取代内联代码）** — When: the code is equivalent to an existing function | How: swap in the call directly; if it doesn't fit well, change the function first | Tradeoff: check that the semantics agree
- **T-08.6 · Slide Statements（移动语句）** — When: related code should sit together | How: after confirming there are no side-effect dependencies, move it as a whole | Tradeoff: paves the way for extraction
- **T-08.7 · Split Loop（拆分循环）** — When: one loop does several things | How: one loop per concern | Tradeoff: no "performance-sensitive regret" — the loops can be merged back into a pipeline
- **T-08.8 · Replace Loop with Pipeline（以管道取代循环）** — When: the loop makes the data processing unclear | How: replace it step by step with filter/map | Tradeoff: the intent becomes visible at once
- **T-08.9 · Remove Dead Code（移除死代码）** — When: code with no callers | How: clean up the references (including comments/reflection), then delete | Tradeoff: version control has already kept the record

## Organizing Data (ch09) — 5 techniques — [ch09](chapters/ch09-organizing-data.md)
- **T-09.1 · Split Variable（拆分变量）** — When: one variable carries several meanings | How: one variable per meaning | Tradeoff: accumulators/loop variables are the exception
- **T-09.2 · Rename Field（字段改名）** — When: the field name is out of date | How: change it directly inside; for public ones use migration and forwarding | Tradeoff: the cost of propagating the rename is manageable
- **T-09.3 · Replace Derived Variable with Query（以查询取代派生变量）** — When: derived data is being cached | How: delete the update path and compute it live | Tradeoff: for performance-sensitive spots the cache can be revisited
- **T-09.4 · Change Reference to Value（将引用对象改为值对象）** — When: a small object is internally referenced from many places | How: change setting into wholesale replacement + equals/hashCode | Tradeoff: "update = new object" is the most robust
- **T-09.5 · Change Value to Reference（将值对象改为引用对象）** — When: a large object needs a shared identity/cache | How: build a repository that fetches instances by ID | Tradeoff: use a reference when cloning conflicts with identity

## Simplifying Conditional Logic (ch10) — 6 techniques — [ch10](chapters/ch10-simplifying-conditional-logic.md)
- **T-10.1 · Decompose Conditional（分解条件表达式）** — When: the condition and the branch bodies are too long | How: make the condition and each branch a function | Tradeoff: intent comes first
- **T-10.2 · Consolidate Conditional Expression（合并条件表达式）** — When: several conditions share the same result | How: combine them with && / || | Tradeoff: don't merge the order-sensitive ones
- **T-10.3 · Replace Nested Conditional with Guard Clauses（以卫语句取代嵌套条件表达式）** — When: a nested maze | How: invert the special case and return early | Tradeoff: guard clauses only when the main line > the special cases
- **T-10.4 · Replace Conditional with Polymorphism（以多态取代条件表达式）** — When: repeated switches | How: subclass overrides or double dispatch | Tradeoff: a single switch doesn't need it
- **T-10.5 · Introduce Special Case（引入特例）** — When: null/special values of "the same default-value shape" repeat in many places (many occurrences ≠ the criterion) | How: a special case class unifies the default behavior | Tradeoff: reduces conditional drift
- **T-10.6 · Introduce Assertion（引入断言）** — When: you are relying on invariants | How: add an assert to state the assumption | Tradeoff: not for business logic

## Refactoring APIs (ch11) — 10 techniques — [ch11](chapters/ch11-refactoring-apis.md)
- **T-11.1 · Separate Query from Modifier（将查询函数和修改函数分离）** — When: a function both queries and modifies | How: copy out the query and put the side effect into the modifier | Tradeoff: callers won't be polluted by accident
- **T-11.2 · Parameterize Function（函数参数化）** — When: two functions differ only in a literal | How: merge them into one function with a parameter | Tradeoff: don't force-merge when the behavior patterns differ
- **T-11.3 · Remove Flag Argument（移除标记参数）** — When: the parameter only selects a path | How: split it into named functions | Tradeoff: call sites become self-explanatory
- **T-11.4 · Preserve Whole Object（保持对象完整）** — When: parameters are pulled field by field out of an object | How: pass the object itself | Tradeoff: it only makes sense for a real aggregate
- **T-11.5 · Replace Parameter with Query（以查询取代参数）** — When: the actual argument is a property of the calling object | How: query inside the function | Tradeoff: reduces the caller's burden
- **T-11.6 · Replace Query with Parameter（以参数取代查询）** — When: the function reaches directly for global/remote data | How: inject it as a parameter | Tradeoff: testability first
- **T-11.7 · Remove Setting Method（移除设值函数）** — When: the field should be constructed and then never change | How: remove/delete the setter | Tradeoff: immutability semantics
- **T-11.8 · Replace Constructor with Factory Function（以工厂函数取代构造函数）** — When: construction semantics are unclear / a type must be chosen | How: add a createXxx that returns an instance | Tradeoff: can return subtypes
- **T-11.9 · Replace Function with Command（以命令取代函数）** — When: the function is too long / has too many parameters | How: build a class that executes step by step | Tradeoff: a container for complex algorithms
- **T-11.10 · Replace Command with Function（以函数取代命令）** — When: the command has only one method left | How: collapse it into a plain function | Tradeoff: over-structured things need to be dismantled

## Dealing with Inheritance (ch12) — 11 techniques — [ch12](chapters/ch12-dealing-with-inheritance.md)
- **T-12.1 · Pull Up Method（函数上移）** — When: identical functions in subclasses | How: move them to the superclass | Tradeoff: use a template method for the small differences
- **T-12.2 · Pull Up Field（字段上移）** — When: identical fields in subclasses | How: move them to the superclass | Tradeoff: constructor parameters go straight there
- **T-12.3 · Pull Up Constructor Body（构造函数本体上移）** — When: subclass constructors share a common section | How: pull it up + parameter object | Tradeoff: reduces duplication
- **T-12.4 · Push Down Method（函数下移）** — When: a superclass function is meaningful to only one subclass | How: copy it to the subclass and delete it from the superclass | Tradeoff: clean up before abstracting the superclass
- **T-12.5 · Push Down Field（字段下移）** — When: a field is used by only some subclasses | How: move it to the subclass | Tradeoff: slims the superclass down
- **T-12.6 · Replace Type Code with Subclasses（以子类取代类型码）** — When: a type code drives behavior | How: factory + subclasses + overrides | Tradeoff: unnecessary when the branches are few and small
- **T-12.7 · Remove Subclass（移除子类）** — When: the subclass has no independent value | How: fold it into the superclass | Tradeoff: slims the structure down
- **T-12.8 · Extract Superclass（提炼超类）** — When: two classes share a common part | How: create an abstract superclass and pull up | Tradeoff: "composition" is an optional alternative
- **T-12.9 · Collapse Hierarchy（折叠继承体系）** — When: the hierarchy has lost its meaning | How: merge, then delete the subclass | Tradeoff: once drained, collapse it
- **T-12.10 · Replace Subclass with Delegate（以委托取代子类）** — When: the subclass refuses the interface / multi-dimensional variation | How: a delegate field + forwarding | Tradeoff: dispenses with the disguise of "is-a"
- **T-12.11 · Replace Superclass with Delegate（以委托取代超类）** — When: the superclass leaks too much of its interface | How: aggregate + forward what is needed | Tradeoff: composition beats inheritance
