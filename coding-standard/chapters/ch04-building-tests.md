# Ch04 — Building Tests

## Core Idea
Reliable tests are the precondition for changing existing code: tests must be **fully automated, self-checking and run frequently**. This chapter uses the Province/Producer example to demonstrate how to add a test suite to existing code before refactoring.

## Frameworks Introduced
- **Self-Testing Code（自测试代码）**: test code is checked into the repository together with the production code and runs at the push of a button; “OK” means it passed.
  - When to use: whenever you write a new feature, write tests alongside it; and before any refactoring
  - Payoff: turns “finding bugs” into “run them and flush them out” — running frequently + recent changes = fast localization
- **Red bar / green bar**: a failing test = red bar (do not keep changing code while the bar is red); all passing = green bar; “back to green” = undo to the most recent all-passing state
- **Fixture（测试夹具）setup**: a three-layer structure of setup-exercise-verify (that is, arrange-act-assert / given-when-then), plus the often-neglected teardown phase
- **Risk-driven testing**: tests should focus on “the part I am most worried about getting wrong” (complex logic, boundary conditions), not on simple getters/setters; too many tests can actually lead to insufficient testing
- **A recipe for adding tests to existing code**: ① fill in expected values at random ② replace them with the real values the program produces ③ deliberately introduce an error to confirm the test fails ④ revert the error

## Key Concepts
- **Test structure** (Mocha example): `describe` (grouping) + `beforeEach` (create a fresh fixture before every test) + `it` (a test case, one focal verification); assert/expect-style assertions
- **Failure vs error**: an assertion not passing during the verify phase vs an exception thrown during setup (such as `doc.producers.forEach is not a function`) — the latter often indicates that, when the input cannot be trusted, you should validate it / use Introduce Assertion, while a trusted data source needs no such over-defensiveness
- **The shared-fixture anti-pattern**: hoisting `const asia = ...` to an outer scope lets tests pollute one another and makes results depend on execution order — rebuild the fixture with `beforeEach`
- **Immutable shared fixtures**: share only when the fixture is one hundred percent certain to be immutable

## Mental Models
- **Write the goal twice** (once in the code, once in the test) — you have to make the same mistake twice to fool the detector
- **Think like an enemy of the program**: when testing, actively think about how to break the code; this mindset raises productivity
- **Test coverage cannot measure test quality**: the standard for a good test suite is subjective — “if someone introduces a bug, how confident am I that the tests will catch it?”

## Anti-patterns
- **Insisting on “test every public function”**: a mass of ineffective tests hides the real risks
- **Chasing the perfect test and never writing any**: “writing an imperfect test and running it often beats an endless wait for the perfect test”
- **Shared mutable fixtures**: test results depend on execution order — one of the “most disgusting bugs”
- **Cramming several assertions into one it**: the first assertion to fail masks important error information (except for tightly related ones)

## Code Examples
```javascript
describe('province', function() {
  let asia;
  beforeEach(function() {
    asia = new Province(sampleProvinceData()); // a fresh fixture every time
  });
  it('shortfall', function() {
    expect(asia.shortfall).equal(5);
  });
});
```
- **What it demonstrates**: a standard fixture + independent tests; `sampleProvinceData()` provides {name:"Asia", producers:[{cost:10,production:9},...], demand:30, price:20}

## Worked Example
Boundary-condition probing (a complete exercise in adding tests to existing code):
1. Producers are an empty collection → shortfall=30, profit=0
2. demand=0 → shortfall=-25, profit=0; demand=-1 → shortfall=-26, profit=-10 (and the follow-up question: does a negative demand make sense? should the setting method throw or clamp to zero?)
3. An empty-string demand → the result is NaN (exposing the behavior of parseInt)
4. `producers: ""` as a string → you get `TypeError: forEach is not a function` — distinguish “failure” from “error”; validation is needed only when the input comes from an external service, and adding validation to a trusted internal source instead causes duplicated verification
5. The thinking each boundary test provokes is often worth more than the test itself

## Key Takeaways
1. Tests must be self-checking (no human staring at the output), otherwise you spend a great deal of time comparing
2. Run them frequently: run the tests for the code you are handling at least every few minutes; run the whole suite at least once a day
3. When you hit a bug: first write a test that can reproduce it, and the fix is only complete when that test passes
4. Refactoring does not change observable behavior — if a boundary test goes beyond what is observable (such as error handling), what you wrote before refactoring may have to be deleted
5. A small number of tests is often enough to bring surprising returns; do not let coverage metrics hold you hostage

## Connects To
- **ch01**: the first step of the example — “tests before refactoring”
- **ch02**: Self-Testing Code is the foundation of refactoring; TDD (the test-code-refactor cycle)
- **ch06**: Introduce Assertion (it serves “fail fast when an assumption does not hold”)
- **ch10**: the formal mechanics of the Introduce Assertion refactoring
