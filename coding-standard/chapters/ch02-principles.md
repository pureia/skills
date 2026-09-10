# Ch02 — Principles in Refactoring

## Core Idea
Refactoring (noun) = a change to the internal structure of software that makes it easier to understand and cheaper to modify without changing its observable behavior; refactoring (verb) = restructuring software with a series of refactorings. Refactoring is not a “big cleanup”, it is a continuous practice whose only goal is development speed.

## Frameworks Introduced
- **Two Hats（两顶帽子）**: Kent Beck's metaphor — adding new functionality (without modifying existing code) and refactoring (without adding functionality) are two different states; you switch between them often but never confuse them.
  - When to use: before changing any code, first answer “which hat am I wearing right now”
  - Rule: while refactoring, do not add new tests (except when you discover a gap); modify tests only when handling an interface change
- **Rule of Three（三次法则, Don Roberts）**: the first time you do something, you just do it; the second time you do something similar, you wince at the duplication but do it anyway; the third time you should refactor. Three strikes and you refactor.
- **The design-stamina hypothesis**: investing effort in improving the internal design → increases the durability of the software → keeps development fast for longer.
- **A checklist of when to refactor**: preparatory refactoring (make the change easier before adding functionality), comprehension refactoring, litter-pickup refactoring, refactoring while reviewing code, long-term refactoring (Branch By Abstraction).
- **Refactoring and performance**: the three-part approach to performance — time budgeting (real-time systems), constant attention (ineffective), the hotspot approach (measure first → find the hotspots → optimize them in a focused way). **First write software that is easy to tune, then tune it.**

## Key Concepts
- **Observable behavior**: the behavior “the user cares about” is unchanged before and after refactoring; performance and interface signatures may change
- **Published Interface（已发布接口）**: an interface whose owner has no right to modify the client code — it gets in the way of refactoring
- **Design stamina**: internal quality — easy to find the place to change, easy to understand, well divided into modules
- **Continuous Integration（持续集成）**: integrate into the mainline at least once a day, so that feature branches that live too long do not make merging exponentially harder
- **Code ownership**: team code ownership is recommended over fine-grained strong ownership

## Mental Models
- **Every step of a refactoring is small → the code is rarely left in a non-working state** → you can stop at any time
- **“Speed” is the absolute justification for refactoring**: the only purpose of refactoring is to develop faster; refuse to argue for it with moral reasons such as “clean code”
- **First make the change easy, then make the easy change** (Kent Beck): can't add the new feature properly? Refactor until it is easy, then add it
- **The YAGNI decision rule**: assess “how hard would it be to refactor this later”; only when future refactoring would be hard should you build the flexibility mechanism now

## Anti-patterns
- **Treating refactoring as a specialized big project**: the overwhelming majority of refactoring should be opportunistic and rarely needs to be scheduled; forcing “refactoring commits” to be kept separate from feature commits is also disputed
- **Trading flexibility for “parameters/hooks prepared for the future”（Speculative Generality）**: flexibility mechanisms are not free — they add complexity now and are more likely to be changed incorrectly later
- **Constant-attention optimization**: every change starts from one narrow, local viewpoint, so 90% of the optimization work is wasted
- **Guessing at performance bottlenecks**: even if you know the system completely (Ron Jeffries' lesson), measure rather than guess

## Worked Example
The Chrysler Comprehensive Compensation system performance case: everyone speculated about several performance bottlenecks and discussed optimization plans — and every guess was wrong. Actual measurement found that half the time went into creating “date” instances, and that these instances held only a few distinct values; further digging showed that a large number of the “date ranges” were empty. The empty-range behavior was therefore extracted into a factory function that returned a fixed, unchanging “empty date range” object — the system ran nearly twice as fast, and it took about five minutes. The lesson: measure first, do not speculate.

## Key Takeaways
1. “Our code was unavailable for two days while we refactored” — then what you did was not refactoring
2. When to refactor: before adding a new feature (preparatory), when fixing a bug, when trying to understand code, when reviewing
3. Beautiful code also needs refactoring — the trade-offs shift as requirements change
4. Refactoring is not a silver bullet, it is silver pliers: it helps you keep the code well under control at all times
5. Performance: refactoring may make the code slower, but it makes performance tuning during the optimization phase easier, and the hotspot approach needs good structure to stand on

## Connects To
- **ch01**: the principles in practice (small steps + tests + commit)
- **ch04**: Self-Testing Code is the foundation of refactoring (the first foundation stone)
- **ch07**: Continuous Integration works together with the three practices (self-testing, CI, refactoring)
- **ch03**: smells are the radar for “when should I refactor”
