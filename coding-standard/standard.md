# The Standard — 31 rules

Read the group that matches what you are writing, not the file. Every rule has the
same five fields:

- **Rule** — what must hold.
- **Signal** — the smell (ch03) that appears when it does not.
- **Counter-example** — what the violation looks like in real code.
- **Remedy** — the technique that fixes it (ch06–ch12).
- **Verify** — how a reader confirms the rule holds without running anything.

Rules marked **NON-BOOK** (§H) are not from *Refactoring*. They are correctness
hazards, and they leave as a separate task — never inside a refactoring (Two Hats,
ch02). Those four carry **Rule / Counter-example / Verify** only: the book gives them
no smell to detect and no remedy to apply, which is exactly why they cannot be folded
into a refactoring step.

**Groups**

| Group | Rules | Read it when… |
|---|---|---|
| [Naming](#naming) | N1–N3 | you are naming anything |
| [Functions and parameters](#functions-and-parameters) | F1–F3 | you are writing a function signature or body |
| [Data and state](#data-and-state) | D1–D4 | you are deciding where a value lives |
| [Conditionals and loops](#conditionals-and-loops) | C1–C5 | you are writing a branch or an iteration |
| [Modules and dependencies](#modules-and-dependencies) | M1–M3 | you are deciding what goes where |
| [Interfaces and inheritance](#interfaces-and-inheritance) | I1–I3 | you are choosing between inherit and delegate |
| [Tests](#tests) | T1–T4 | always, when behaviour is involved |
| [Comments](#comments) | X1–X2 | you are about to explain the code in prose |
| [Correctness hazards (NON-BOOK)](#correctness-hazards-non-book) | H1–H4 | you are writing or reviewing anything that touches money, input, or a contract |

---

## Naming

### N1 · A name says what the thing means, not how it works
- **Rule** — Name the domain concept. If a reader must open the body to know what a name means, the name is wrong.
- **Signal** — Mysterious Name (ch03)
- **Counter-example** — `data`, `tmp`, `process2`, `handleIt()`, `flag`, a class called `Manager`.
- **Remedy** — Rename Variable, Rename Field, Change Function Declaration (ch06, ch09)
- **Verify** — Read the call site aloud. If the sentence is meaningless without the body, rename before doing anything else.

### N2 · Rename the moment a name stops being true
- **Rule** — A name that has drifted from its meaning is worse than no name: it actively misleads. Renaming is cheap and is the first move, not a cleanup for later.
- **Signal** — Mysterious Name (ch03)
- **Counter-example** — `getUser()` that now returns an organisation; `isValid` that also normalises its input.
- **Remedy** — Rename Variable / Rename Field / Change Function Declaration (ch06, ch09); use the forwarding-shell migration for a published interface (ch02)
- **Verify** — Every call site reads as a true statement.

### N3 · Name the concept, not its representation
- **Rule** — Money is not a `number`, a phone number is not a `string`, a range is not a pair of ints. When a value has rules, it is a type.
- **Signal** — Primitive Obsession, Data Clumps (ch03)
- **Counter-example** — `amount: number` plus `currency: string` passed together through six signatures; validation of the same format in four places.
- **Remedy** — Replace Primitive with Object, Replace Type Code with Subclasses (ch07, ch12)
- **Verify** — The rules that govern the value are declared once, next to the type, not repeated at each use site.

---

## Functions and parameters

### F1 · Small enough to read in one screen, named for the one thing it does
- **Rule** — Extract until each function does one thing and its name says what that is. A one-line function is fine when the name carries meaning the body does not; length alone is never the reason to extract or not to extract.
- **Signal** — Long Function (ch03) — around six lines is where the smell starts.
- **Counter-example** — `handleOrder()` that validates, prices, persists and emails; a nested `if` ladder inside it.
- **Remedy** — Extract Function (ch06). When temporaries block extraction: Replace Temp with Query → Introduce Parameter Object → Replace Function with Command (ch06, ch07, ch11).
- **Verify** — The function fits one screen and its name is a complete sentence about the domain.

### F2 · A short parameter list of things that are actually one thing each
- **Rule** — Keep the parameter count low; group values that always travel together; never pass a flag that only selects a code path.
- **Signal** — Long Parameter List, Data Clumps (ch03)
- **Counter-example** — `createUser(name, email, street, city, zip, country, isAdmin)`; `sendReport(data, true)` where the boolean picks the format.
- **Remedy** — Introduce Parameter Object, Preserve Whole Object, Remove Flag Argument, Replace Parameter with Query (ch06, ch11)
- **Verify** — Every call site is readable without the signature; no caller passes a literal `true`/`false` that changes behaviour.

### F3 · The function lives with the data it uses
- **Rule** — Put a function where the data it touches lives. A function that mostly reads someone else's fields is in the wrong module, however well written it is.
- **Signal** — Feature Envy (ch03)
- **Counter-example** — A pricing function on `Invoice` that reads twelve fields of `Customer` and one of its own.
- **Remedy** — Move Function (ch08); Combine Functions into Class when several functions share the same foreign data (ch06)
- **Verify** — For each function, ask which object owns most of the data it touches. If the answer is not its own class, move it.

---

## Data and state

### D1 · Derived data is computed, not stored
- **Rule** — If a value can be calculated from other values, calculate it. Cached derivations need a measurement to justify them, not a guess.
- **Signal** — Mutable Data (ch03)
- **Counter-example** — `total` stored on an order and updated in five places; one of the five is forgotten and the totals disagree.
- **Remedy** — Replace Derived Variable with Query (ch09)
- **Verify** — No field can be made inconsistent by updating another field.

### D2 · One variable, one meaning
- **Rule** — A variable that carries two meanings at different times is two variables. Accumulators and loop counters are the accepted exceptions.
- **Signal** — Mutable Data (ch03)
- **Counter-example** — `result` holding a search hit, then a cache value, then an error message in the same function.
- **Remedy** — Split Variable (ch09)
- **Verify** — You can describe the variable's meaning in one phrase that holds for its whole lifetime.

### D3 · Shared and mutable are both contained
- **Rule** — Anything global, long-lived or widely writable gets an access point that can be watched; the smaller the scope of mutation, the better.
- **Signal** — Global Data, Mutable Data (ch03)
- **Counter-example** — A module-level `config` object mutated from six files; a singleton whose state differs per test.
- **Remedy** — Encapsulate Variable, Encapsulate Collection, Remove Setting Method, Combine Functions into Transform/Class (ch06, ch07, ch11)
- **Verify** — Every write goes through one named place, and you can find all of them.

### D4 · Choose value or reference deliberately
- **Rule** — Small, identity-free, replaced whole → value object. Shared identity, large, or stored in a registry → reference object. Do not drift between the two.
- **Signal** — Mutable Data, Data Class (ch03)
- **Counter-example** — A `Money` mutated in place by three callers, each expecting its own copy.
- **Remedy** — Change Reference to Value, Change Value to Reference (ch09)
- **Verify** — You can state which one it is and the callers agree; equality semantics match that choice.

---

## Conditionals and loops

### C1 · Conditions state their intent
- **Rule** — A condition that needs decoding becomes a function named after what it decides; a branch body that needs scrolling becomes a function named after what it does.
- **Signal** — Long Function, Comments (ch03)
- **Counter-example** — `if (date.month > 5 && date.month < 9 && !customer.isNew)` with a thirty-line body inside.
- **Remedy** — Decompose Conditional (ch10)
- **Verify** — The `if` line reads as a sentence in the domain language.

### C2 · Guard the exception, chain the equals
- **Rule** — When one branch is the main line and the others are special cases, return early for the special cases. When all branches are equally important, keep the `if/else if` chain.
- **Signal** — nested conditionals, Long Function (ch03)
- **Counter-example** — Five levels of nesting where the first three levels only handle "not found", "retired", "suspended".
- **Remedy** — Replace Nested Conditional with Guard Clauses (ch10)
- **Verify** — The happy path is at the left margin with no indentation; the exit conditions read top to bottom.

### C3 · Merge conditions that share an outcome — and only those
- **Rule** — Conditions producing the same result and free of side effects belong in one expression. Conditions whose evaluation order matters, or whose semantics differ, stay apart.
- **Signal** — Duplicated Code, Long Function (ch03)
- **Counter-example** — Three `if`s returning `0`; merged with `||` into a condition whose order now hides a null dereference.
- **Remedy** — Consolidate Conditional Expression (ch10); extract the merged condition into a named predicate
- **Verify** — Each condition's failure mode is still visible and the order is still safe.

### C4 · The same decision is expressed once
- **Rule** — Repeated switches or if-ladders over the same type, in more than one place, are one decision expressed many times. Replace the repetition with polymorphism.
- **Signal** — Repeated Switches (ch03)
- **Counter-example** — `switch (employee.type)` in `pay()`, `benefits()` and `schedule()`, each updated when a type is added.
- **Remedy** — Replace Conditional with Polymorphism, Replace Type Code with Subclasses (ch10, ch12)
- **Verify** — Adding a new variant means adding one thing in one place.
- **Counter-example that is not a smell** — A single switch, in one place, over stable branches. Polymorphism buys indirection you will pay for at every read; use a data table instead (ch10).

### C5 · A pipeline over a hand-rolled loop, one job per pass
- **Rule** — Express data transformation as filter/map/reduce (or the language's equivalent) so the intent is visible. A loop doing two jobs is two loops.
- **Signal** — Loops (ch03)
- **Counter-example** — A `for` loop accumulating a total, collecting names and counting failures in one pass, with three index variables.
- **Remedy** — Replace Loop with Pipeline, Split Loop (ch08)
- **Verify** — The data flow reads in one direction with no index arithmetic.

---

## Modules and dependencies

### M1 · One reason to change, and one change touches one place
- **Rule** — A module that changes for several unrelated reasons is doing several jobs; a change that forces edits across many modules means something is scattered. Both are the same coupling problem seen from opposite sides.
- **Signal** — Divergent Change (one module, many change directions); Shotgun Surgery (one change, many modules) (ch03)
- **Counter-example** — A `Report` class edited for tax rules, for layout and for database migrations; or adding one field that requires edits in nine files.
- **Remedy** — Split Phase, Extract Class, Move Function/Field, Combine Functions into Class/Transform, Inline (ch06, ch07, ch08)
- **Verify** — You can name the module's single responsibility in one phrase, and one change lands in one place.

### M2 · No reaching through, no private deals
- **Rule** — Do not navigate a chain of strangers to get work done (`a.getB().getC().doIt()`), and do not let two modules trade data they both keep private. But hiding everything is its own mistake — a class that only forwards is a middle man.
- **Signal** — Message Chains, Insider Trading, Middle Man (ch03)
- **Counter-example** — `order.customer().address().city()` in fifteen call sites; two classes sharing a private field through a back channel.
- **Remedy** — Hide Delegate, Remove Middle Man, Move Function/Field (ch07, ch08)
- **Verify** — Each class's public surface is what its callers actually need — no more, no less.

### M3 · Nothing dead, nothing speculative
- **Rule** — Delete code nobody calls and hooks nobody uses. Add flexibility only when changing it later would be genuinely hard — the third time you need it, not the first (Rule of Three).
- **Signal** — Lazy Element, Speculative Generality (ch03)
- **Counter-example** — An abstract `BaseHandler` with one subclass; a parameter no caller ever sets; a "for future use" interface.
- **Remedy** — Remove Dead Code, Inline Function/Class, Collapse Hierarchy, Change Function Declaration (ch06, ch08, ch12)
- **Verify** — Every abstraction has at least two real users today, and version control remembers what you deleted.

---

## Interfaces and inheritance

### I1 · Inherit for substitutability, delegate for reuse
- **Rule** — Inheritance says "is-a" and promises the whole interface works. When a subclass refuses part of what it inherits, or you only want the implementation, use delegation.
- **Signal** — Refused Bequest (ch03)
- **Counter-example** — `Stack extends Vector`, exposing `get(0)` and `removeRange()`; a subclass throwing `UnsupportedOperationException`.
- **Remedy** — Replace Subclass with Delegate, Replace Superclass with Delegate, Push Down Method/Field (ch12)
- **Verify** — Every inherited member is meaningful in the subclass; no override exists only to disable something.

### I2 · A type code that drives behaviour wants to be a type
- **Rule** — When behaviour branches on a type code, the variants are already classes that have not been written yet. But a small, stable branch is not worth the structure (see C4).
- **Signal** — Repeated Switches, Primitive Obsession (ch03)
- **Counter-example** — `if (kind === 'A') ... else if (kind === 'B')` repeated across a module, plus constant strings scattered as literals.
- **Remedy** — Replace Type Code with Subclasses, Replace Conditional with Polymorphism (ch12, ch10)
- **Verify** — Adding a variant adds a class, not an `else if`.

### I3 · A published interface changes by migration, never by edit
- **Rule** — When other people's code calls it, you cannot change the signature in place. Add the new declaration, keep the old one forwarding to it, migrate callers, then delete the shell.
- **Signal** — Published Interface (ch02)
- **Counter-example** — Renaming a public method and pushing a breaking release "because renaming is cheap"; or a half-migrated codebase where both signatures do slightly different things.
- **Remedy** — Change Function Declaration with a forwarding shell (ch06)
- **Verify** — At every commit, both the old and the new call shape work; the shell disappears only after the last caller moves.

---

## Tests

### T1 · New behaviour arrives with a test that failed first
- **Rule** — Write the test, watch it fail for the right reason, then make it pass. A test written after the code proves what the code does, not what it should do.
- **Signal** — missing coverage is itself the signal (ch04)
- **Counter-example** — A new branch shipped with no test; a test added later that asserts the buggy output because "that's what it does".
- **Remedy** — Self-Testing Code (ch04)
- **Verify** — The test's failure message describes the missing behaviour, not an error in the test.

### T2 · Test observable behaviour, at the boundaries
- **Rule** — Assert on what a caller can observe, not on internal calls or private state. Cover the boundary values: empty, zero, one, maximum, and the just-past-the-limit case.
- **Signal** — brittle tests that break on every refactoring (ch04)
- **Counter-example** — A test asserting a private field was set, or that a mock was called twice — it passes while the feature is broken and fails when the code is improved.
- **Remedy** — Self-Testing Code (ch04)
- **Verify** — The test still passes after a pure refactoring of the code under test.

### T3 · Changing existing code starts from green
- **Rule** — Run the suite first. If the area is uncovered, write tests that pin the current behaviour and watch them pass before touching anything. A red bar stops the work: roll back, then take a smaller step.
- **Signal** — unexplained red bars (ch04, cheatsheet.md § Red-bar protocol)
- **Counter-example** — "The tests were already failing, so I refactored anyway."
- **Remedy** — Get back to green before any restructuring (cheatsheet.md)
- **Verify** — You know which tests cover the target and that they pass *now*.

### T4 · A bug fix starts with the test that exposes it
- **Rule** — Reproduce the defect as a failing test, then fix it. The test is what stops the bug from coming back and is the only proof the fix addresses the reported problem.
- **Signal** — a bug fixed without a new test (ch04)
- **Counter-example** — A one-line guard added "while I was in there", with no test and no note.
- **Remedy** — Self-Testing Code (ch04)
- **Verify** — Reverting the fix makes the new test fail.

---

## Comments

### X1 · A comment that explains the code is a missing name
- **Rule** — If you need prose to say what a block does, extract it and name it. If you need prose to say what a function is for, rename it. If you need prose to state an assumption the code relies on, assert it.
- **Signal** — Comments (ch03)
- **Counter-example** — `// check if the user can be given a discount` above a five-line condition, and `// total must never be negative` with no check.
- **Remedy** — Extract Function, Change Function Declaration, Introduce Assertion (ch06, ch10)
- **Verify** — Deleting the comment loses no information a reader cannot get from the names.

### X2 · Keep the why, delete the what
- **Rule** — A comment earns its place by recording something the code cannot: an external constraint, a citation, a surprising reason, a deliberate deviation. Comments that restate the code are a deodorant for a smell (ch03).
- **Signal** — Comments used as deodorant (ch03)
- **Counter-example** — `// increment i by one`; `// call the service`; and a hundred-line function whose only defence is a header comment.
- **Remedy** — Delete the noise; where the comment was hiding a real problem, fix the problem (ch06)
- **Verify** — Every remaining comment would surprise a reader who deleted it.

---

## Correctness hazards (NON-BOOK)

**These four are not from *Refactoring*.** They are the class of problem this standard
surfaces but does not fix in place: they change observable behaviour, so executing any
of them inside a refactoring breaks the one guarantee that makes refactoring safe
(Two Hats, ch02). Name them, mark them as a separate task, and never let them ride
along with a structural change.

### H1 · Numeric precision and rounding
- **Rule** — Money and other exact quantities do not live in binary floating point without a stated rounding policy. Decide the precision, the rounding mode and the moment of rounding once, and write it down.
- **Counter-example** — `0.1 + 0.2` in a price; a discount applied to an already-rounded total; tax computed per line then summed versus summed then computed.
- **Verify** — The unit, the precision and the rounding point are named in the type or the contract, not implied.

### H2 · Validation at trust boundaries
- **Rule** — Every value entering the system from outside — user input, network payloads, files, third-party responses — is checked for presence, type, range, size and encoding before it is used.
- **Counter-example** — `JSON.parse(body)` straight into a query; an assumed non-null field from an API; an unbounded upload.
- **Verify** — You can point at the line where untrusted data becomes trusted.

### H3 · Ambiguous contracts
- **Rule** — Pin down what the contract means by empty: `null` versus `[]` versus missing; units and time zones; ordering guarantees; idempotency; and what happens on partial failure.
- **Counter-example** — A function returning `null` for "not found" and `[]` for "none" and `0` for "unknown"; a retried payment that charges twice.
- **Verify** — Each degenerate case has a specified answer that a caller can rely on.

### H4 · Behaviour changes never ride along
- **Rule** — A refactoring preserves observable behaviour. A bug fix, a new validation, a rounding correction or an added retry is a behaviour change: separate task, separate commit, its own test.
- **Counter-example** — "I extracted the function and fixed the off-by-one while I was there" — now a red bar tells you nothing about which change caused it.
- **Verify** — Every commit can be labelled as either structure or behaviour, never both (Two Hats, ch02).
