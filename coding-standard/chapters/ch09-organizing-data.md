# Ch09 — Organizing Data

## Core Idea
The data group deals with the mutability and derivation of messy data: split variables that carry mixed purposes, rename fields, replace derived data with a query, and switch between reference and value objects at the right semantics.

## Frameworks Introduced

### Split Variable（拆分变量）
- Motivation: one variable is assigned several times carrying different meanings (loop variables are the exception; an accumulating total or product is also a single meaning)
- Mechanics: ① find the variable that is assigned more than once ② create a new variable for each "different meaning" ③ the original name serves only the first meaning ④ declare each later meaning independently ⑤ test
- Boundary: the loop variable `i` and the accumulator `total` are legitimate multiple assignments — do not split them

### Rename Field（字段改名）
- Motivation: the field name is out of date or vague; while refactoring, the record structure is still an object, so the cost of renaming is manageable
- Mechanics: ① rename a simple field directly and update the callers ② for a public API use the migration style: a new field plus getter/setter functions forwarding to the old field ③ change every call site ④ delete the old field ⑤ test

### Replace Derived Variable with Query（以查询取代派生变量）
- Motivation: derived data is cached in a variable (totalProduction, discountedTotal and the like); the update logic spreads out and easily falls out of sync
- Mechanics: ① find the field that is modified as a source (delete the setting path) ② build a query function that computes at call time ③ point every read at the query ④ test; in performance-sensitive areas you may re-examine caching, everywhere else always use a query
- Key point: `addProducer` updates only the source field `producers`; the derived value is computed live

### Change Reference to Value（将引用对象改为值对象）
- Motivation: small objects (money, date ranges) are better immutable; reference semantics create the "change one place, several change" trap
- Mechanics: ① confirm the object's behavior is symmetric (equals/hashCode) ② turn setters into whole-object assignment ③ test
- Benefit: updating = replacing (`new`), instead of "find every reference and change it one by one"

### Change Value to Reference（将值对象改为引用对象）
- Motivation: the object is large and sharing instances makes sense (people, organizations); copying it every time brings identity and memory problems
- Mechanics: ① build a repository ② objects are obtained from the repository (associated by ID) ③ handle equality (keep a single instance) ④ update the constructors/factories ⑤ test
- Decision rule: **value vs reference = is the data worth sharing**; small and without identity → value, large and needing identity → reference

## Mental Models
- **Mutability is the most expensive thing**: anything computable should not be stored; if it is stored, guarantee it is "defined in exactly one place"
- **A name must carry a single meaning**: multi-purpose variables (such as `result` reused at different stages) should be split
- **Choosing value/reference**: money, dates → value objects; customers, accounts → reference objects

## Worked Example
`Province` class: `_totalProduction` is accumulated by hand in two places, the `constructor` and `addProducer`. Refactoring: delete the `_totalProduction` field and the manual updates, change `get totalProduction()` to `this._producers.reduce((sum, p) => sum + p.production, 0)`; `addProducer` only pushes; the shortfall/profit tests still pass — the derived data has exactly one source.

## Key Takeaways
1. Split variables: one variable per distinct meaning; loop variables/accumulators are the exception
2. Rename a field: rename directly inside; a public API uses migration-style forwarding
3. Derived values are always replaced with a query — unless measurement proves a cache is necessary
4. Value objects are immutable and replaced whole; reference objects share identity through a repository
5. Decide who owns the data first, then choose value/reference semantics

## Connects To
- **ch03**: Mutable Data, Data Clumps, Primitive Obsession
- **ch06**: Introduce Parameter Object（引入参数对象）(a typical source of value objects)
- **ch07**: Replace Primitive with Object（以对象取代基本类型）, Encapsulate Record（封装记录）
- **ch13**: index of this group of refactorings
