# Cheatsheet — decisions for code that already exists

> The reverse entry to the standard: you have code, and something about it is wrong.
> Rules for writing code live in [standard.md](standard.md); mechanism details in
> [patterns.md](patterns.md); definitions in [glossary.md](glossary.md).

## When is it worth changing existing code

| Situation | Action |
|---|---|
| Adding a feature and the structure gets in the way | Refactor first (preparatory), then add |
| You have to re-read code to work out what it does | Extract or rename immediately (comprehension refactoring) |
| You spot simple rubbish | Clear it as you pass (litter-picking) |
| Investigating a bug's root cause | Remove the duplication or merge the logic that let it happen |
| The code is no longer modified and nobody needs to understand it | Leave it |
| Rewriting is easier than refactoring | Rewrite — an experienced judgement, not a default |
| The team has ignored refactoring for a long time | Only then is a scheduled, planned refactoring worth it |

## 🔴 Red-bar protocol

- Never refactor on a red bar. Get back to green first.
- Refactoring = each step compiles (or passes the language check) → tests → commit. On failure, roll back and take a smaller step.
- Refactoring is not rewriting: anyone claiming "the code will be unusable for two days" is not refactoring.
- **The more complex the change, the smaller the steps**: break it into more, smaller, verifiable pieces.

## Failure mode → fallback (if X fails → Y)

> On any symptom, try the first fix; if that fails, take the fallback. Where a rollback
> path exists, roll back first.

| Trigger | First fix | Still stuck |
|---|---|---|
| No good name comes to mind while extracting | Stop extracting, or use a literal placeholder name and carry on | Inline it back — not being able to name it usually means it should not exist |
| No tests, or tests are red | Write the test that pins the current behaviour, watch it pass, then prove it can fail (break the code deliberately, see red, undo) | Return to the last green version and choose a smaller refactoring path |
| Behaviour changed after a step (tests pass, results are wrong) | Roll back to the last verifiable version | Locate the difference with Split Phase or a side-by-side comparison, then choose a path |
| The target is a published API, or not all callers can be found | New signature + old function as a forwarding shell (migration rename) | Migrate callers one by one, delete the shell only at the end — never in one move |
| The extracted fragment would have to return several assigned variables | Replace Temp with Query / Split Variable first, to simplify | Abandon the extraction; do the preparatory work first and come back |
| Type code with few, stable branches (a single switch) | Leave it — polymorphism costs an indirection layer; use a data table when behaviour differences are small | Only when branches keep growing and keep repeating: Replace Conditional with Polymorphism |
| Worried that refactoring will hurt performance | Measure first, find the hotspot (90% of the time is in 10% of the code) | Optimise the hotspot and measure again; pre-optimisation is a separate conversation |
| Only one branch is the special case (early exit) | Guard clause: invert and return early | All branches equal → keep the chain, do not use guard clauses |
| A subclass refuses its superclass's interface | Push Down Method / Push Down Field | Still painful → Replace Subclass/Superclass with Delegate |
| A data clump loses its meaning when one item is removed | Extract Class + Introduce Parameter Object | Preserve Whole Object: pass the object rather than splitting it further |

## Smell → remedy (the 24 smells, first response)

> The first thing to reach for; mechanism in [patterns.md](patterns.md). ch = the
> chapter holding the remedy.

| Smell | First response | ch |
|---|---|---|
| Mysterious Name | Change Function Declaration / Rename Variable / Rename Field | ch06, ch09 |
| Duplicated Code | Extract Function; between subclasses → Pull Up Method | ch06, ch12 |
| Long Function | Extract Function; many temporaries → Replace Temp with Query → Introduce Parameter Object → Replace Function with Command | ch06, ch07, ch11 |
| Long Parameter List | Introduce Parameter Object / Preserve Whole Object / Remove Flag Argument | ch06, ch11 |
| Global Data | Encapsulate Variable | ch06 |
| Mutable Data | Encapsulate Variable + Split Variable / Separate Query from Modifier / Remove Setting Method / Replace Derived Variable with Query | ch06, ch09, ch11 |
| Divergent Change | Split Phase / Move Function / Extract Class | ch06, ch08, ch07 |
| Shotgun Surgery | Move Function/Field / Combine Functions into Class·Transform / Inline | ch08, ch06, ch07 |
| Feature Envy | Move Function (whoever owns the most data) | ch08 |
| Data Clumps | Extract Class + Introduce Parameter Object | ch07, ch06 |
| Primitive Obsession | Replace Primitive with Object | ch07 |
| Repeated Switches | Replace Conditional with Polymorphism | ch10 |
| Loops | Replace Loop with Pipeline | ch08 |
| Lazy Element | Inline Function / Inline Class / Collapse Hierarchy | ch06, ch07, ch12 |
| Speculative Generality | Collapse Hierarchy / Inline / Remove Dead Code | ch06, ch08, ch12 |
| Temporary Field | Extract Class / Move Function | ch07, ch08 |
| Message Chains | Hide Delegate | ch07 |
| Middle Man | Remove Middle Man / Inline Function | ch07, ch06 |
| Insider Trading | Move Function/Field / Hide Delegate | ch08, ch07 |
| Large Class | Extract Class / Extract Superclass / Replace Type Code with Subclasses | ch07, ch12 |
| Alternative Classes with Different Interfaces | Change Function Declaration to align, then Move Function to align the protocol | ch06, ch08 |
| Data Class | Encapsulate Record / Remove Setting Method / Move Function (bring the behaviour in) | ch07, ch11, ch08 |
| Refused Bequest | Refusing the implementation can be ignored; refusing the interface → Replace Subclass/Superclass with Delegate | ch12 |
| Comments | Extract Function / rename / Introduce Assertion | ch06, ch10 |

## Priority criteria (which remedy first when several apply)

> Three axes, satisfied top-down. Use them when remedies conflict.

- **① Dependency order** — move fields before functions; remove local variables before extracting; clear dead code before restructuring; new signature + old shell → migrate each caller → delete the shell.
- **② Risk gradient** — do the low-risk, behaviour-preserving moves first (rename, extract, remove dead code), then the risky ones (Change Function Declaration, API refactoring, inheritance restructuring). Every step must be reversible.
- **③ Value and timing** — what blocks the feature you are adding beats comprehension beats litter-picking beats review beats the long-term refactoring (Branch By Abstraction). **YAGNI**: build flexibility now only when changing it later would be genuinely hard.

**Conflict ruling**: when value/timing argues for risk, use "old and new side by side
(forwarding shell) + gradual migration" instead of one big move. When the three axes
agree, following them in order is the safest path.

## Popular practice vs Fowler's position

> Community alternatives are often mistaken for equivalents. These are the 2nd
> edition's positions; answer from the book's intent, not from the popular version.

| Popular practice | Fowler's position (2nd ed.) | ch |
|---|---|---|
| `Optional.orElse()` / collapsing null checks with truthiness chains | The guard clause is the standard form; introduce a Special Case only when the repeated pattern is demonstrably clear | ch10 |
| Null Object pattern | The 2nd edition calls it Introduce Special Case; the special case can be a class, a record or a transform wrapper — not only a class | ch10 |
| Strategy pattern for type dispatch | Behaviour switching with state → strategy; a fixed type tested in the same way in several places → polymorphism | ch10, ch12 |

## Tactical reminders

- Two-step moves: remove local variables before extracting; move fields before moving functions.
- Split Phase: the intermediate structure is immutable, one context per phase.
- Performance: measure, find the hotspot, optimise the hotspot, measure again. A pipeline is not free either — a two-pass `map`+`reduce` measured 11–15× slower than the loop it replaced, so measure the rewrite rather than assuming the loop was the slow part.
- Thresholds that start a conversation: a function past ~6 lines; the same code seen a third time (Rule of Three); a name longer than its body is fine (the `highlight → reverse` case).
- Test frequency: the tests covering what you are touching, every few minutes; the full suite, at least daily.
- Every bug: the test that exposes it comes first, and the fix is done when that test passes.
