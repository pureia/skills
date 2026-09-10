# Glossary

**Bad Smell（坏味道）** — A suspicious signal in the code (24 kinds) that hints refactoring is needed, but does not directly define a change (ch03).

**Branch Merge Cost（分支合并成本）** — The longer a feature branch stays alive, the more the difficulty of merging rises exponentially; continuous integration is the antidote (ch02).

**Catalog（重构名录）** — The collection of refactoring techniques recorded in the format name / sketch / motivation / mechanics / examples (ch05).

**Combine Functions into Class/Transform（函数组合成类/变换）** — Two ways to organize a group of functions and data: a class (stateful) or a transform (read-only data) (ch06).

**Command（命令）** — The pattern of wrapping a complex function in an object so it can be executed step by step and reuse context (ch11).

**Data and Behavior（数据与行为）** — The principle of modularization: maximize interaction within a region and minimize interaction across regions; data and behavior change together (ch03).

**Data Class（纯数据类）** — A class with only fields and accessor functions, whose behavior has been put in the wrong place (ch03).

**Data Clumps（数据泥团）** — Data items (fields/parameters) that always show up in groups; they should be extracted into an object (ch03).

**Design Stamina Hypothesis（设计耐久性假说）** — Improving the internal design extends the period during which software development stays fast (ch02).

**Feature Envy（依恋情结）** — A function that is overly fond of another module's data/behavior; the function should be moved (ch03).

**Fixture（测试夹具）** — Objects/data configured before a test; rebuilding it with beforeEach is recommended to guarantee independence (ch04).

**Guard Clause（卫语句）** — Return early for the special case, avoiding nested conditionals (ch10).

**Insider Trading（内幕交易）** — Too much private data swapping between modules; move things or hide the delegate (ch03).

**Lazy Element（冗赘的元素）** — A program element (function/class) that makes no substantial contribution; it should be inlined or collapsed (ch03).

**Making Change Easy（令修改容易）** — Kent Beck: first change the code to make the new feature easy to add, then add the new feature (ch02).

**Message Chain（消息链）** — A long string of getter calls; govern it with Hide Delegate (ch03).

**Middle Man（中间人）** — A class whose interface is half nothing but delegated forwarding; handle it with Remove Middle Man or Inline Function (ch03, ch07).

**Naming（命名）** — One of the two hardest things in programming; if you cannot think of a good name, there is probably a deeper design problem behind it (ch03).

**Observable Behavior（可观察行为）** — The invariant in the definition of refactoring: the behavior the user cares about stays the same before and after refactoring; performance and the internal call stack may change (ch02).

**Primitive Obsession（基本类型偏执）** — The smell of using integers/strings in place of domain concepts (money, coordinates, ranges) (ch03).

**Published Interface（已发布接口）** — An interface whose declarer has no right to modify the client code; migration-style renaming (a shell + forwarding) is the solution (ch02).

**Refactoring (noun)（重构（名词））** — A kind of adjustment to the internal structure of software that, without changing observable behavior, improves understandability and lowers the cost of modification (ch02).

**Refactoring (verb)（重构（动词））** — Using a series of refactoring techniques to adjust the structure without changing observable behavior (ch02).

**Refused Bequest（被拒绝的遗赠）** — A subclass inherits the superclass implementation but refuses its interface: a design error in the inheritance hierarchy — when mild, ignore it; when severe, replace it with delegation (ch03, ch12).

**Rhythm of Refactoring（重构的节奏）** — Small changes + compiling/testing/committing at every step = the key to preventing chaos (ch01).

**Rule of Three（三次法则）** — Do it the first time, feel aversion the second time, refactor the third time (ch02).

**Self-Testing Code（自测试代码）** — Test code goes into the repository together with the production code, is fully automated, self-checking, and run frequently (ch04).

**Semantic Distance（语义距离）** — The gap between what a function "does" and "how it does it"; the watershed for the decision to extract (ch03).

**Silver Pliers（银钳子）** — The positioning of refactoring: not a silver bullet, but it can keep code well under control at all times (ch02).

**Special Case（特例）** — A null object / default-value object that simplifies conditional checks (ch10).

**Speculative Generality（夸夸其谈通用性）** — Hooks/parameters/abstractions put in place for "someday" (ch03).

**Temporary Field（临时字段）** — A field that is set only in one particular situation; it should be extracted into a class (ch03).

**Test Coverage（测试覆盖率）** — It can only tell you which code is not covered; it cannot measure test quality (ch04).

**Test-Driven Development (TDD)（测试驱动开发）** — The short test → code → refactor loop, repeated many times every hour (ch04).

**Three-Change Smell Pair（三类变化的坏味道对）** — Divergent Change (one module changing in many directions) and Shotgun Surgery (one change scattered across many modules) mirror each other; Feature Envy is anti-modularization (ch03).

**Two Hats（两顶帽子）** — Kent Beck's metaphor: adding functionality and refactoring are two states that are never confused with each other (ch02).

**Type Code（类型码）** — Expressing a variant with a string/number; eliminate it with Replace Type Code with Subclasses + polymorphism (ch12).

**Value Object vs Reference Object（值对象 vs 引用对象）** — Small and without identity → a value (replace wholesale); large and needing identity → a reference (shared through a repository) (ch09).
