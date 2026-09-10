# Ch06 — A First Set of Refactorings

## Core Idea
The first set of refactorings is the foundational set for building “functions” and their combinations: Extract/Inline Function and Variable, renaming, Encapsulate Variable, turning parameters into objects, organizing functions into classes/transforms, and Split Phase. This is the lowest-level refactoring — the essence of “forming a function and giving it a name”.

## Frameworks Introduced

### Extract Function（提炼函数）
- Motivation: when you see a code fragment that takes time to understand (especially when it has a comment at the top), separate intention from implementation
- Mechanics: ① create a new function named for what it does (nest it inside the source function to reduce scoping problems) ② copy the code ③ check for out-of-scope variables → pass them in as parameters; a single assigned variable → turn it into a query and return it; several assigned variables → Split Variable / Replace Temp with Query first ④ compile ⑤ replace the call ⑥ test ⑦ search for duplicated code and switch it to the new function
- Failure mode: cannot think of a good name → perhaps it should not be extracted; after extracting you find it does not fit → inline it back

### Inline Function（内联函数）
- Motivation: the function body is as clear as its name / the function is used at only one call site / the indirection is no longer appropriate; the reverse of Extract Function
- Mechanics: ① confirm that polymorphic calls do not apply ② find all the call sites ③ replace the body into the call sites piece by piece (one at a time) ④ delete the original function ⑤ test

### Extract Variable（提炼变量）
- Motivation: the expression is hard to understand (such as the deep condition in `if (platform.usesMac && ...)`), or you want to reuse it as part of a complex expression
- Mechanics: ① confirm the expression to be extracted has no side effects ② declare a new variable and assign it ③ replace the original expression ④ test; if it is used repeatedly → extract it into a function (preferred)

### Inline Variable（内联变量）
- Motivation: the variable name expresses no more than the expression / the variable stands in the way of extraction; the reverse of Extract Variable
- Mechanics: ① confirm the assignment expression has no side effects and is assigned only once ② check whether it is used only once ③ replace it with the expression ④ delete the variable ⑤ test

### Change Function Declaration（改变函数声明）
- Motivation: renaming (a name used for a long time that no longer fits), adding/removing parameters, changing parameter types (including the migration form, New Function)
- Mechanics (direct form): ① declare the new signature ② change the callers (with the IDE or site by site) ③ remove the old function ④ test
- Mechanics (migration form, published interfaces / when all the callers are hard to find): ① create the target function ② wrap the old function in a thin forwarding shell ③ migrate the callers one by one ④ delete the old function; migrating a parameter value works the same way
- Key point: this is one of the most commonly used refactorings (the main remedy for Mysterious Name)

### Encapsulate Variable（封装变量）
- Motivation: global data / widely mutable data is highly dangerous; funnel access into functions
- Mechanics: ① create getter/setter functions ② static check ③ rename the functions into get/set form ④ test ⑤ consider making the returned collection/reference immutable (return a copy)
- Key point: every path that changes the data must go through the setter — that is what “controlling access” means

### Rename Variable（变量改名）
- Motivation: a variable's meaning changes as your understanding deepens
- Mechanics: ① confirm the scope is not large (a small scope inside a function → find and replace is enough; a large scope → Encapsulate Variable first) ② rename all references ③ test; the IDE's rename is safer

### Introduce Parameter Object（引入参数对象）
- Motivation: several parameters always appear together (Data Clumps); shared between functions
- Mechanics: ① create a new value object class ② pick the common items out of the parameters ③ modify the function signature ④ update the callers to pass the new object ⑤ test; Move Function is often done afterwards to put behavior into it
- Payoff: the parameter list gets shorter, and an object that “can be told to do a lot” appears

### Combine Functions into Class（函数组合成类）
- Motivation: a group of functions operates on the same set of data (the global data / long parameter list situation)
- Mechanics: ① create a class ② move the data in as fields ③ move the functions in (turning parameters into field references) ④ change the call sites to use class instances ⑤ test; Extract Class can follow (in essence this is the “combine functions into an object” pattern)

### Combine Functions into Transform（函数组合成变换）
- Motivation: functions process the same read-only data in a compositional way; the alternative path to combining into a class
- Mechanics: ① create a transform function that takes the raw data ② move the calculation logic in step by step ③ no fields — call it once for each result you want ④ the data source stays as it is; test

### Split Phase（拆分阶段）
- Motivation: one piece of code handles two completely different things one after the other (such as parse then calculate; calculate then render)
- Mechanics: ① identify the phase boundary (two sequential groups of transformations) ② extract the second phase into a function (with the data object as a parameter) ③ the first phase passes through an intermediate object with no intermediate structure ④ rework ⑤ test ⑥ iterate to split out further phases
- Caution: the intermediate data object should be immutable by design

## Mental Models
- **The reverse of extraction is just as common**: the motivation for inlining is “the indirection is not worth existing”
- **Naming comes before structure**: this small set — Extract, Rename, Parameterize — is used every day
- **Combine into class vs combine into transform**: a stateful process → a class; a pure data transformation → a transform

## Code Examples
```javascript
// Extract Function (the printOwing case): comment → function name
//print details
console.log(`name: ${invoice.customer}`);
// →
function printDetails(outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```
- **What it demonstrates**: a comment is a guide to extraction; a nested function can access variables from the enclosing scope

## Worked Example
The migration form of Change Function Declaration: `amountFor(aPerformance, play)` needs the `play` parameter removed — first replace `play` inside the body with `playFor(aPerformance)` (compile, test), then remove the parameter from the signature and from every call site (compile, test), rather than changing the signature and all the call sites in one go.

## Key Takeaways
1. Clean up local variables first (query/inline), and extraction becomes noticeably simpler
2. Renaming: for a small scope, rename directly; for a large scope, encapsulate first
3. A parameter combination that keeps appearing → Introduce Parameter Object; the same batch of functions + data → Combine Functions into Class/Transform
4. Split Phase is the antidote to “multiple directions of change” — use an immutable data object as the intermediate structure
5. Follow the checklist for every technique: compile (or the language check) → test → commit

## Connects To
- **ch01**: the first set of refactorings are the stars of the ch01 example (Extract Function, Inline Variable, Change Function Declaration, Replace Temp with Query)
- **ch03**: remedies for smells such as Mysterious Name, Data Clumps and Duplicated Code
- **ch07**: further encapsulation of variables/records and collections
- **ch13**: the English names / chapter index for this group of refactorings
