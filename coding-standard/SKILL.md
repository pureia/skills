---
name: coding-standard
description: "Use this skill whenever code is being written, changed, reviewed, or explained: it is the coding standard, built from the 24 smells and 61 refactorings of Martin Fowler's Refactoring (2nd ed.) and turned into forward rules for new code plus a decision system for existing code. Trigger it for writing new code, adding a feature, code review, refactoring, smell detection, code quality, naming, long functions, long parameter lists, conditionals, inheritance versus delegation, and for learning or teaching these techniques. Also trigger on 编码规范, 代码规范, 写代码, 代码审查, 重构, 坏味道, 代码质量. Six scenarios — write new code / add a feature / review / refactor / make the change / learn — each loading only the file it needs: standard.md (rules), cheatsheet.md (decisions), patterns.md and chapters/ (depth)."
---

<!-- argument-hint: [scenario, topic, technique name, or chapter number] -->

# Coding Standard

The same knowledge read in two directions. Forward — "I am writing this, what must
it satisfy?" — is [standard.md](standard.md): 31 rules, each traceable to a smell or
a remedy in *Refactoring*, 2nd ed. Backward — "this code smells, now what?" — is
[cheatsheet.md](cheatsheet.md). Depth lives in [patterns.md](patterns.md) (61
techniques) and [chapters/](chapters/) (ch01–ch13).

## Pick the scenario first

Decide what the user is actually asking for before loading anything. The scenario
decides which file is worth its context.

| The user is… | Load | Answer with |
|---|---|---|
| writing new code | [standard.md](standard.md) — only the group matching what they are writing | Track C |
| adding a feature to existing code | [standard.md](standard.md) — the groups the feature touches, as when writing new code — then [cheatsheet.md](cheatsheet.md) § "When is it worth changing existing code" | Track A plan, then Track C |
| reviewing code | [standard.md](standard.md) — the whole file is the checklist here, unlike the one-group rule for writing | Track A |
| asking "should this change?" or refactoring | [cheatsheet.md](cheatsheet.md) first, [patterns.md](patterns.md) for the chosen remedy | Track A, then § Doing the change |
| told to make the change ("just fix it") | as above, plus the checkpoints | § Doing the change |
| learning or teaching a technique | [patterns.md](patterns.md), then the chapter | Track B |

Never load the whole skill. The chapters are depth on demand, not background reading.

## Loading ladder

Top to bottom, stop at the first hit:

1. **Scenario table above** decides the file family.
2. **[standard.md](standard.md)** decides when the question is "how should this be written" — one group, not the file.
3. **[cheatsheet.md](cheatsheet.md)** decides when the question is "this exists and is wrong" — smell → first-response remedy, priority order, failure fallbacks. When the answer hinges on a design choice (where a function belongs, value vs reference, inherit vs delegate, command vs function), the criterion lives in [standard.md](standard.md) — load that group as well; the refactoring scenario does not otherwise reach it.
4. **[patterns.md](patterns.md)** when the mechanism matters: how the technique is done, what it costs.
5. **[chapters/](chapters/)** when motivation, a worked example, or a counter-example is needed.
6. **[glossary.md](glossary.md)** when a term is unclear — every entry carries its chNN source.
7. **The user proposes a popular practice** (Optional, Strategy, Null Object) → [cheatsheet.md](cheatsheet.md) § "Popular practice vs Fowler's position" first, then answer from the book's position.
8. **Not in the book at all** → say so plainly, reason from the book's principles, and never invent a chapter citation. Three shapes of this: a practice the book never treats (RxJS, framework idioms, a language's own style); a real smell with **no named refactoring behind it** (magic literals — say so and use the nearest rule, e.g. N3, rather than reaching for a chapter); and "is X even in this skill?" — answer from § Out of scope or from the rule ids, and do not go searching the package for absence.
9. **A companion file cannot be read** (missing, unreadable, or the client loaded only this file) → say so, then answer from what is actually here: the scenario table, the checkpoints, and the anti-pattern blacklist. Never invent rule ids, chapter numbers or technique mechanics you could not read — a thinner answer that is true beats a rich one that is guessed.
10. **The user names a chapter** (ch10, "the one about conditionals") → load that file from [chapters/](chapters/) directly; that is what the argument hint takes chapter numbers for.
11. **Nothing to route on** — no scenario, no code, no topic → [cheatsheet.md](cheatsheet.md) is the default decision entry; if even that is unclear, ask what they are working on instead of guessing.

## 🔴 Checkpoints

**Changing existing code**

- 🔴 **Before changing anything** — never change code the user did not ask you to change. If the change touches a published API, spans files, or is wide in scope, give the plan summary and the steps, then wait. "Just change it" waives the discussion of a small local change; it does not waive this rule for a published API, a cross-file change or a wide scope — those still get a summary first. When the summary has nowhere to go because there is no user to answer (an autonomous run), Track A ③ says what to do instead of waiting. How much to *say* when the user only asked for a judgement is Track A's question, not this one (see Track A: ① and stop).
- 🔴 **After each step** — the language check → the tests covering what you touched → the full suite → commit while green. Roll back on a red bar rather than pushing on.
- 🛑 **STOP** — no test suite covering the target: plan only, do not touch the code. If the user explicitly says "just change it", pin the behaviour first: write the test that pins it, watch it pass, then prove it can fail — break the code deliberately, watch red, undo the break. A test that cannot be made to fail proves nothing. Distinguish the two red bars you will meet here: a red bar the break *exposed* is the proof you wanted; a red bar the code step *caused* is a rollback.
- 🛑 **STOP — you cannot execute anything** (no repository mounted, tests not runnable here, no runtime): say so in as many words — "verification not executed" — and change nothing. Deliver the minimal-step plan, the target end state, and a checklist for the user to run it (green baseline → one step at a time → on any red bar, roll back that step). Never write a record claiming a test or a result you did not observe.

**Writing new code**

- 🔴 No baseline is required — there is no previous behaviour to preserve. But new behaviour ships with its own test (§T1). Never refuse to write new code because the project has no test suite.
- 🔴 Behaviour never rides along. A refactoring preserves observable behaviour; a bug fix, an added validation or a rounding change is a *separate* task (Two Hats, ch02). Name it, do not smuggle it.

## Answer flows

Every section leads with the conclusion, then the evidence. Pick the track by the
request, not by habit.

### Track A — assess or plan (existing code)

When the user asks only for a judgement ("should I change this?", "is this a problem?"),
give ① and stop — a plan nobody asked for is noise. Read the request for a volume cap as
well as a question: "just tell me whether", "a verdict is enough", "no detailed plan" all
mean ① alone, and the rest of the track is only for a user who wants the plan or the
work. The one thing that still gets said is a **correctness hazard** from ② — it is a
separate task, not a plan, and it is the one finding the user cannot get from a verdict.

- **① Verdict** — change it / leave it, plus one sentence of reason, citing the smell name (ch03) or the rule id.
- **② Evidence** — every smell you found, by location (function / line / fragment) → first-response remedy (chNN); list them all, expand none. Nothing wrong? Then list the smells you ruled out and why, and separately flag any **correctness hazard** found ([standard.md](standard.md) § Correctness hazards) as a separate task, never folded into the refactoring plan.
- **③ Plan** — collect the **hard constraints** first: a frozen public API, single-file scope, no new dependencies, a time budget, anything else the user stated (if they said nothing, infer from the code and say what you inferred). Then produce *one* ordered path, not a menu — a shortlist of alternatives is not a plan. Every step = action + verification (compile / test / behaviour comparison) + what to do when it fails. Steps that touch a published API or span files carry 🔴 pending confirmation. Remedies that violate a hard constraint are listed as excluded, with the reason. Unresolved constraint conflicts → 🔴 state both sides and their consequences, ask the user to rule; do not pick silently. When there is no user to ask (an autonomous run), do not stall: state both sides, mark the assumption you proceeded on, and carry on with it flagged so it can be overturned. Code shape: intermediate steps give the fragment or the action described; the final form gets a complete code block.
- **④ Tests and open questions** — which tests to write first (boundary values, watched red), how each step is re-verified, and only those business questions that change the plan.
- **⑤ Not doing** — what is deliberately untouched (YAGNI, anti-pattern blacklist, out of scope, no suite → plan only) and the hazards from ② declared as "not in this plan". Do not lay out the whole catalogue at once: everything you *could* also fix, listed together, is over-refactoring.

### Track B — explain a technique or concept

- **① What it is** — name (English + Chinese) + chNN + one-sentence definition.
- **② When / when not** — two or three signals for use, and at least one explicit counter-example where it is the wrong move.
- **③ How** — ordered steps, each with its verification, plus at least one before/after fragment.
- **④ Cost and landing** — the tradeoff (indirection is not free), test advice (ch04), where the book's own example lives (ch §).

### Track C — write code

Code first. Then, only if a rule was traded off, at most three lines:

```
Standards applied: F1, C2, M3
Deliberately not applied: C4 — a single, stable switch is not a smell (ch10)
```

Silent compliance is the normal case; a full rule-by-rule report is noise. Name the
rules by id so the reader can look them up, and name the tradeoff honestly rather
than pretending every rule was satisfied.

**Language adaptation** — the book's examples are JavaScript. Whatever the user's
language is, produce the changed code *in that language*: translate the mechanism
(pipeline → streams or generators, subclass override → interface implementation,
factory → constructor or static method) and keep the identifiers idiomatic to that
language. Technique names stay as named; the mechanism is what matters.

## Doing the change, not just planning it

When the user asks you to make the change rather than to judge it, plan it with Track A
first, then run this loop. The loop is what separates a refactoring from a rewrite: every
step is small, verified, and revertible on its own.

1. **Baseline** — run the tests covering the target and confirm they are green. If they do not cover it, write the test that pins the current behaviour and prove it can fail (break the code deliberately, watch red, undo) before touching anything. A red bar here is not an obstacle, it is the finding: the behaviour is not pinned yet.
2. **Smallest step** — one behaviour-preserving change (rename, extract, pipeline, move). If a step needs two ideas at once, split it.
3. **Verify, then commit** — run the language check, then the tests covering what you touched, then the full suite, then commit while green. Each step leaves one line of evidence: the command and the result you observed. A step with no observed result is not verified — and a claim without a result is the one thing this loop exists to prevent. A red bar means roll back *this* step and take a smaller one; never debug forward on a red bar.

   **A red bar caused by a requested behaviour change is a third kind, not a rollback.** When you add or change a feature, an existing test may have pinned the very contract the user asked you to change. That bar is neither expected-red-by-design nor an accident: rolling back would mean not doing the work. Locate the assertion, state what it pinned, and update it *inside the change that invalidates it* — never in a separate "fix the tests" commit, because the diff that explains the change and the diff that proves it must move together. Name the updated assertion in the close-out. The freeze rule still holds for everything the request did not ask you to change.
4. **Repeat** — back to 2 until the plan is done.
5. **Close out in the past tense** — state what was actually done and what each step's verification showed ("extracted `itemShippingFee`, suite green, committed"), not a to-do list of what should be done, and name what you deliberately did not do (Track A ⑤).

**When the loop cannot run as written.** It bends; it does not break:

- **No repository to commit to.** Do not fake it. Either make a scratch copy and initialise a repository there, so each step really is a revertible commit, or say plainly that the commit step is unavailable and hand the steps over as a patch. Never write "committed" when nothing was committed. This is not bookkeeping: the commit is what makes a *deliberate break* undoable. Where a step's work is not committed, undo a break by restoring the files you saved, never with `git checkout -- <path>` or its equivalent — that discards every uncommitted change in those files, including the step you were in the middle of.
- **No suite covering the target.** The pinning tests are then yours, not the project's — say so, and keep them with the change so the next person inherits them.
- **A differential check is a legitimate second opinion, not a green bar.** Running the original and the changed code side by side over the same inputs and comparing the results is the strongest evidence available when the real suite is out of reach. Name it a differential check, state which inputs it covered and which it did not, and never report it as "the tests pass". If you had to alter the code to make it testable — an added `export`, a seam, a stub — disclose that what you verified is not byte-identical to what you delivered.
- **Nothing runnable at all.** Then you are not in this loop: use the "verification not executed" branch of the checkpoints.

**Language adaptation** — the book's examples are JavaScript. Whatever the user's
language is, produce the changed code *in that language*: translate the mechanism
(pipeline → streams or generators, subclass override → interface implementation,
factory → constructor or static method) and keep the identifiers idiomatic to that
language. Technique names stay as named; the mechanism is what matters.

## Anti-pattern blacklist

Stop when you hit one of these.

- **Single switch → polymorphism reflex.** Polymorphism costs an indirection layer; with few, stable branches use a data table (ch10).
- **Bulk special-casing of null checks.** Requires a demonstrably repeated default shape — the count of null checks is not the criterion (ch10).
- **Touching code with no test coverage.** Plan only, per the checkpoint.
- **Changing code the user did not ask you to change.** Published API, multi-file, wide scope → summary first, wait.
- **Pre-building flexibility for reuse.** YAGNI: build it only when changing it later would be genuinely hard (ch02).
- **Smuggling a behaviour change into a refactoring.** Bug fix, validation, rounding — a separate task, always (ch02, Two Hats).
- **"The code will be unusable for two days."** That is a rewrite, not a refactoring.
- **Refusing new code because there is no test suite.** New code needs a test, not a baseline.
- **Inventing style rules.** Formatting, casing conventions, import order and file layout belong to the project's linter and formatter. Read their config; do not legislate.
- **Citing a chapter for something the book does not cover.** Say "the book does not cover this" and reason from its principles.

## Files

| File | Role |
|---|---|
| [standard.md](standard.md) | The rules: 31 entries in 9 groups, each rule → signal → counter-example → remedy → verification |
| [cheatsheet.md](cheatsheet.md) | Decisions for existing code: when to act, red-bar protocol, failure fallbacks, 24 smells → remedy, priority criteria, popular practice vs Fowler |
| [patterns.md](patterns.md) | The 61 techniques: when to use / how / tradeoff |
| [glossary.md](glossary.md) | Terms, each with its chNN source |
| [chapters/](chapters/) | ch01–ch13 digests, read on demand |
| [test-prompts.json](test-prompts.json) | **Evaluation material, not a loading target** — the probes this skill is tested with, including their expected answers. Never read it to answer a user, and never let it shape a reply. |
| [evals/](evals/) | **Evaluation material, not a loading target** — the same probes as a runnable eval set, with the checks each one is graded on, the fixture repo some of them run against, and `artifact_order.py`, which decides the order-and-landing checks from file metadata rather than from the answer's own account of itself. Same rule: never load it to answer a user. |

**Bilingual glosses** — inside this skill's own files, each of the 61 techniques and the
24 smells carries its Chinese name in full-width parentheses at first mention, because
those are the two indexes a reader of the Chinese edition looks things up by; other book
concepts keep a Chinese gloss only in [glossary.md](glossary.md). In an answer, add the
Chinese name only when the user is reading Chinese and the technique's name is doing real
work in the reply: a reader who knows the English name does not need the pair spelled out
every time, and repeating it across a long answer costs attention the answer could spend
on the code.

## Chapter index

| # | Title | Key frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-first-example.md) | Refactoring: A First Example | Refactoring rhythm, Extract Function, Split Phase, polymorphic pricing |
| [ch02](chapters/ch02-principles.md) | Principles in Refactoring | Two Hats, Rule of Three, when to refactor, the three performance strategies |
| [ch03](chapters/ch03-bad-smells.md) | Bad Smells in Code | The 24 smells and their first-response remedies |
| [ch04](chapters/ch04-building-tests.md) | Building Tests | Self-testing code, fixtures and beforeEach, risk-driven testing |
| [ch05](chapters/ch05-catalog-intro.md) | Introducing the Catalog | The five-part catalog format: name / sketch / motivation / mechanics / example |
| [ch06](chapters/ch06-first-set-of-refactorings.md) | A First Set of Refactorings | Extract/Inline, renaming, parameter objects, combine into class/transform, split phase |
| [ch07](chapters/ch07-encapsulation.md) | Encapsulation | Records, collections, primitive obsession, extract/inline class, delegation |
| [ch08](chapters/ch08-moving-features.md) | Moving Features | Move function/field/statements, pipeline over loop, dead code |
| [ch09](chapters/ch09-organizing-data.md) | Organizing Data | Split variable, rename field, derived queries, value vs reference |
| [ch10](chapters/ch10-simplifying-conditional-logic.md) | Simplifying Conditional Logic | Decompose/consolidate, guard clauses, polymorphism, special case, assertions |
| [ch11](chapters/ch11-refactoring-apis.md) | Refactoring APIs | Query/modifier separation, parameterization, command, factory |
| [ch12](chapters/ch12-dealing-with-inheritance.md) | Dealing with Inheritance | Pull up / push down, type codes to subclasses, delegate over inherit |
| [ch13](chapters/ch13-catalog-and-smell-mapping.md) | Appendix: Catalog and Smell Mapping | Full technique index + the 24 smells → remedy mapping |

## Topic index

- **YAGNI** → ch02, standard.md M3
- **Two Hats** → ch01, ch02, standard.md H4
- **The 24 smells (full table)** → ch03, ch13, cheatsheet.md
- **Mysterious Name / Duplicated Code / Long Function / Long Parameter List** → ch03, ch06, standard.md N1–N3, F1–F2
- **Global Data / Mutable Data** → ch03, ch06, ch08, ch09, ch11, standard.md D1–D4
- **Divergent Change / Shotgun Surgery** → ch03, ch06, ch07, ch08, standard.md M1–M2
- **Feature Envy** → ch03, ch08, standard.md F3
- **Data Clumps / Primitive Obsession** → ch03, ch06, ch07, ch10, ch12, standard.md N3, F2
- **Repeated Switches / Loops** → ch03, ch08, ch10, standard.md C4–C5
- **Lazy Element / Speculative Generality** → ch03, ch06, ch12, standard.md M3
- **Temporary Field / Message Chains / Middle Man / Insider Trading** → ch03, ch07, ch08, standard.md M2
- **Large Class / Alternative Classes / Data Class / Refused Bequest / Comments** → ch03, ch07, ch11, ch12, standard.md I1–I3, X1–X2
- **TDD / self-testing code** → ch04, standard.md T1–T4
- **Query/modifier separation, parameterization, flags, command, factory** → ch11, standard.md F2
- **Polymorphism, special case, assertions, guard clauses** → ch10, standard.md C1–C4
- **Inheritance vs delegation, pull up/down, type codes** → ch12, standard.md I1–I2
- **Performance (hotspot method)** → ch02
- **Continuous integration / code ownership** → ch02

## Out of scope: style and formatting

Casing conventions, indentation, import order, file and directory layout, comment
format and linter rules are **not** this skill's business. They are decided by the
project's own tooling and configuration. Read that configuration when it exists and
follow it; when it does not exist, say so rather than inventing a rule. What *is* in
scope is whether a name means what it says, whether a function is doing one job,
whether the data lives with its behaviour — the design questions a formatter cannot
decide.

## Scope and limits

The knowledge base is *Refactoring: Improving the Design of Existing Code*, 2nd ed.
(Martin Fowler). Every rule in [standard.md](standard.md) is traceable to a smell
(ch03) or a technique (ch06–ch12) — except the four **correctness hazards** (§H1–H4),
which are marked NON-BOOK, are surfaced but never executed inside a refactoring, and
always leave as their own task. The book's examples are JavaScript; the mechanisms
are language-agnostic. This skill is synthesized from the book's content and contains
no original text from it.
