# Ch10 — Simplifying Conditional Logic

## Core Idea
The conditional-logic group rewrites judgment code in which "not every branch matters" into a clear form: decompose, consolidate, guard clauses, polymorphism, special cases and assertions. The goal is not to abolish conditionals, but to let them express intent.

## Frameworks Introduced

### Decompose Conditional（分解条件表达式）
- Motivation: long conditional logic plus long branch bodies drown "what to do" in "how to do it"
- Mechanics: ① lift the condition into a predicate function (`isSummer(date)`) ② extract the if/else branch bodies into their own functions ③ test
- Benefit: the reader sees the intent first, and the details retire into the function bodies

### Consolidate Conditional Expression（合并条件表达式）
- Motivation: a row of unrelated ifs that share one result; or nested ifs that can be merged
- Mechanics: ① confirm the conditions have no side effects ② merge them with && / || ③ test; in particular, treat a switch subtree with repeated conditions as a "consolidate conditionals" candidate
- Note: only conditions that differ in semantics ("different sources of judgment for the same result") should be merged; do not merge order-sensitive ones (checking null first)

### Replace Nested Conditional with Guard Clauses（以卫语句取代嵌套条件表达式）
- Motivation: conditions nested into a maze; an "early return" makes every branch plain
- Mechanics: ① pick the outermost condition, invert its meaning into an "early exit" guard clause ② repeat layer by layer until every branch is flat ③ test
- Decision: **guard clause vs main-loop structure** — one branch is the main line and one is the special case → the special case gets a guard clause; all branches are equally important → use an if/else chain

### Replace Conditional with Polymorphism（以多态取代条件表达式）
- Motivation: several switches on the same condition (Repeated Switches); the "type" of the conditional branch is the place that has to change whenever a branch is added
- Mechanics: ① extract the condition into a type code / class hierarchy ② subclasses override `amount()`, or ③ use table-driven double dispatch; move branch by branch, testing as the two coexist
- Variant: **the other direction for replacing conditional logic with polymorphism** — the "type code + derived class" combination, helped by Replace Type Code with Subclasses（以子类取代类型码）
- Note: do not do it when there is only one switch and the condition is simple — polymorphism has an indirection cost

### Introduce Special Case（引入特例）
- Motivation: a lot of code checks `obj == null` or special values such as "N/A"; the special-case role (null object / zero object) is scattered everywhere
- Mechanics: ① build a special-case class (or a special-case record, or a transform wrapper) ② override the behavior that is needed (usually returning a default value) ③ change the client checks into calls to one uniform interface, or let the special-case class share a base class/interface ④ test one by one
- Counter-example: **the number of null checks is not the criterion** — first look at whether the behavior repeats "the same default-value shape" (Rule of Three); if the call sites behave differently (some raise an error, some skip, some use a default) or there is only one check → keep the guard clause, do not introduce a special case (blacklist)
- Common targets: the null object, the default-value object

### Introduce Assertion（引入断言）
- Motivation: the code depends on an invariant, but it is communicated as a "comment" and ignored when people read
- Mechanics: ① find the code that runs correctly only while the assumption holds ② add an assert where the assumption lives (may be switched off in production) ③ test
- Key point: an assertion carries no production logic; "a failed assertion = a program error" is not an error-handling mechanism — it only makes the invariant clear

## Mental Models
- **The ladder of conditional logic**: a one-line condition → decompose; a shared result → consolidate; awkward nesting → guard clauses; type-driven → polymorphism; null-driven → special case; invariant → assertion
- **Separating the main line from the special case**: main line + special case use a guard clause; only equal branches get if/else
- **Polymorphism is the weapon of "concentrated variation"**: adding a branch changes one place only (a new subclass); the price is a layer of indirection

## Worked Example
Replace Nested Conditional with Guard Clauses:
```javascript
// before
function payAmount(employee) {
  if (employee.isSeparated) { return {amount: 0, reason: "SEP"}; }
  if (employee.isRetired) { return {amount: 0, reason: "RET"}; }
  // main-line calculation
  ...
}
// after (inverted into early exits)
if (employee.isSeparated) return {amount: 0, reason: "SEP"};
if (employee.isRetired) return {amount: 0, reason: "RET"};
```
Follow-up: both early exits return a default of the same shape — this is exactly the signal for Introduce Special Case, and the branches can be removed further with `Nothing`/`Retired` special cases.

## Key Takeaways
1. Conditionals go from "long" to "semantic": decompose → consolidate → guard clauses → polymorphism → special case → assertion, ratcheting up one level at a time
2. The applicability criterion for a guard clause: "is it a special case?"
3. Repeated Switches are the only legitimate leading role for polymorphism; a switch is not a sin in itself
4. Assertions hold invariants, not business decisions; do not write tests for assertions
5. Special case and guard clause can relay each other: guard clauses close in first, then polymorphism/special case eliminates

## Connects To
- **ch03**: Repeated Switches, Long Function (conditional logic is an extraction signal)
- **ch12**: Replace Type Code with Subclasses (the construction path to polymorphism)
- **ch04**: the relationship between assertions and the boundary of testing
- **ch13**: index of this group of refactorings
