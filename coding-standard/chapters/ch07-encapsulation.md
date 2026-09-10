# Ch07 — Encapsulation

## Core Idea
The encapsulation group is about data and control of access to it: wrap bare data and temporary variables in structures such as records, collections and classes, narrow the paths of change, and make delegation relationships explicit.

## Frameworks Introduced

### Encapsulate Record（封装记录）
- Motivation: a nested record structure (a JSON literal) is read and written directly from many places, so a rename or a change of logic has to be scattered across every access point
- Mechanics: ① wrap the record in a class ② add a getter/setter for each field ③ encapsulate the nested records recursively (or selectively) ④ test; read-only fields get no setter, and a query can stand in for a helper
- Key point: this is the first-step remedy for Data Class

### Encapsulate Collection（封装集合）
- Motivation: a getter that exposes the collection itself lets outsiders `add`/`remove` directly, and the collected modification behavior cannot be controlled
- Mechanics: ① add a getter that returns a read-only view (a copy or an immutable wrapper) ② add add/remove methods ③ change the outside call sites that modify the collection directly to the new methods ④ test
- Key point: a getter must never return a modifiable reference to the internal collection — a read-only proxy or a copy

### Replace Primitive with Object（以对象取代基本类型）
- Motivation: prices, temperatures, phone numbers, coordinates and the like are used bare as primitive numbers or strings (a "stringly-typed" type)
- Mechanics: ① build a value object (with a constructor and getters) ② change the old data references to the object ③ add the behavior that belongs to this value (conversion, display, comparison) to the object ④ test
- Benefit: a scattering of behavior gathers together, such as display logic and unit conversion

### Replace Temp with Query（以查询取代临时变量）
- Motivation: temporary variables pollute the scope and get in the way of extraction
- Mechanics: ① confirm the variable is assigned once and the assignment expression has no side effects (side effects → split the variable first) ② create a function that returns the value ③ replace the variable in place ④ test
- Benefit: every access point in the function shares one "query", and extraction needs fewer parameters (see `playFor` in ch01)

### Extract Class（提炼类）
- Motivation: some fields and methods in a class always change together, or a group of fields is used only some of the time (Temporary Field, Large Class)
- Mechanics: ① decide which part to split off ② create a new class ③ move fields and move methods ④ test ⑤ adjust the call sites/references of the existing object
- Decision signal: groups of fields sharing a prefix/suffix, a subset of functionality used by only a subset of users

### Inline Class（内联类）
- Motivation: the class has lost its independent value (only one function left; or none of the special responsibilities of that class role remain)
- Mechanics: ① identify the class to inline ② move its fields and methods into the receiver, item by item ③ update the callers ④ delete the old class ⑤ test

### Hide Delegate（隐藏委托关系）
- Motivation: long message chains, a client coupled to a distant object
- Mechanics: ① add a delegating method on the object you want to receive from (encapsulating the getter chain) ② change the original callers to call the delegating method ③ test
- Benefit: clients notice nothing when the navigation structure changes (the manager–secretary pattern)

### Remove Middle Man（移除中间人）
- Motivation: over-delegation — half the interface does nothing but forward (the Middle Man smell)
- Mechanics: ① find the delegated-to object ② connect the client to it directly, or delete the delegating method ③ update the callers ④ test
- Decision: weigh the number of delegating methods against "does this really add value"; Hide Delegate and Remove Middle Man are the two poles, balanced by smell

### Substitute Algorithm（替换算法）
- Motivation: swap in a clearer algorithm, or one that fits the requirement better
- Mechanics: ① prepare a function with the new algorithm ② make the old function call the new one ③ compile + test ④ delete the old algorithm; a fizzbuzz-style comparison of the two algorithms' output is more reliable
- Key point: replace in small steps and then clean up, rather than rewriting in one big step

## Mental Models
- **Encapsulation = narrowing the paths of change**: every modification goes through a small number of functions, so it can be monitored, evolved, and covered with assertions
- **The honesty of getters**: a collection exposed to the outside must be immutable — otherwise the encapsulation amounts to nothing
- **The delegation balance**: Hide Delegate vs Remove Middle Man is the balance between "coupling must be contained" and "indirection must be reduced"

## Worked Example
Encapsulate Collection: `const orders = new Set(); get orders() { return this._orders; }` lets outsiders call `orders.add(...)`; change it to `get orders() { return this._orders.slice(); }` plus `addOrder(x)`/`removeOrder(x)`, change the three outside `add` calls to `addOrder`, and the test confirms the internal collection can no longer be modified directly from outside.

## Key Takeaways
1. First reaction to class variables / singletons / global data: Encapsulate Variable（封装变量）
2. Collections are never returned bare; record hierarchies get encapsulated
3. Temporary Field → Extract Class; Middle Man → Remove Middle Man; message chains → Hide Delegate
4. Substituting an algorithm: run both side by side, delete later, compare the output

## Connects To
- **ch03**: Global Data, Mutable Data, Data Class, Temporary Field, Large Class, Message Chains, Middle Man
- **ch06**: Combine Functions into Class（函数组合成类）— the long-term shape after encapsulation — and Extract Function（提炼函数）
- **ch08**: Move Field（搬移字段）and Move Function（搬移方法）(used when extracting a class)
- **ch09**: the data-organizing group
