# Ch01 — Refactoring: A First Example

## Core Idea
A complete “theatrical troupe prints a bill” example demonstrates the whole course of refactoring: changing existing code safely starts from tests, then small steps in the order “Extract Function — remove local variables — Split Phase — polymorphism”, compiling, testing and committing at every step. The core lesson: **refactoring is a long series of tiny steps, not one big surgery.**

## Frameworks Introduced
- **The Rhythm of Refactoring (compile · test · commit)**: after every tiny behavior-preserving change, immediately compile → run the tests → commit to local version control.
  - When to use: after any single refactoring step
  - Why: when you make a mistake you only have to inspect a very small change; version control provides a rollback point for failures
- **Extract Function（提炼函数, 106）**: pull a piece of code out into a function of its own, named for what it does.
  - When to use: when you see a comment, a switch branch, a loop or another semantic unit
  - Prerequisite: remove unnecessary local variables first so that extraction is simple
- **Replace Temp with Query（以查询取代临时变量, 178）**: turn a temporary variable into a function call, removing the local scope that stands in the way.

## Key Concepts
- **Observable behavior**: refactoring must not change user-observable behavior; irrelevant internal state (such as the function call stack) may change
- **Two Hats**: adding new functionality and refactoring are two different states, and you cannot do both at the same time
- **Semantic distance**: the distance between what a function does and how it does it — the criterion for deciding whether it should be extracted

## Mental Models
- **Move your understanding into the code first** (Ward Cunningham's flash of insight): the understanding that flashes through your mind as you read code, extracted into a function or a name, is not forgotten
- **Small changes = fast feedback**: the more you change, the harder it is to locate a mistake once one happens; small steps are the key to avoiding chaos
- **Refactor only when you need to change it**: if the code works and will not be modified again, there is no need to refactor; changing requirements are what make refactoring necessary

## Anti-patterns
- **Copying an entire function to satisfy a variant requirement**: leads to duplicated logic, so that a future change in one place must be mirrored in another, the number of edit points keeps growing and the chance of error rises sharply
- **Adding a large amount of functionality in one go and testing afterwards**: exactly what the rhythm of refactoring is meant to avoid

## Code Examples
```javascript
// Starting point: a 60-line function with switch-based billing, duplicated code and comments everywhere
function statement (invoice, plays) {
  let totalAmount = 0;
  ...
  switch (play.type) {
  case "tragedy":
    thisAmount = 40000;
    if (perf.audience > 30) { thisAmount += 1000 * (perf.audience - 30); }
    break;
  ...
  }
}
```
- **What it demonstrates**: the sample program (plays.json + invoices.json → a text bill; test data such as Hamlet/$650.00/47 credits can serve as a regression baseline)

## Worked Example
Two requirement changes: ① output an HTML bill ② the billing rules and the credit rules have to change (the types of play will be extended). Fowler's approach:
1. Write tests first: create a number of invoices as input and compare the output against a hand-checked string (self-checking)
2. Extract `amountFor(perf, play)` to pull out the switch billing block; rename `thisAmount` to `result` and rename the parameter to `aPerformance`
3. Remove the local variable `play` (extract `playFor`, then inline the variable) so that `amountFor(aPerformance)` has only one parameter
4. Inline the `thisAmount` temporary variable; move the “calculation” functions out of `statement` and define `renderPlainText` (phase one: calculation)
5. Create `renderHtml` (phase two: formatting), communicating in between through an immutable data object
6. Split out `PerformanceCalculator` subclasses by type (tragedy/comedy) and push down the `amount` and `volumeCredits` calculation functions; `statement` is left with the job of feeding the invoice into the calculator
7. In the end `statement` converges to 3~4 lines of “factory + two render functions”; you can stop at any point after each independent change

## Key Takeaways
1. Changing existing code safely starts from reliable, self-checking tests — without tests, do not touch the code
2. Eliminate local variables first (with queries/inlining), then extract, and extraction becomes much simpler
3. Compile, test and commit at every step; on failure, roll back and retry with smaller steps
4. Duplicated or comment-laden code is a natural signal for extraction
5. Split Phase + polymorphism is the standard strategy for “two directions of change” (separate the phases first, then organize the calculation by type)

## Connects To
- **ch02**: principles — Two Hats, when to refactor, why to refactor
- **ch03**: the smells in the example (Long Function, Duplicated Code, Comments, Repeated Switches)
- **ch04**: the formal tutorial for the “self-checking tests” used in the example
- **ch06**: concrete techniques such as Extract Function, Inline Variable, Change Function Declaration and Replace Temp with Query
- **ch05**: the catalog's record format (sketch/motivation/mechanics/examples)
