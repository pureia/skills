# Changelog — coding-standard

Sections are gists, not diffs: what changed about how the skill behaves or is loaded.
Git holds the full history.

## v5.2 — decoupled from code-review

> v5 and v5.1 built a boundary between this skill and `code-review`, in both
> directions. This entry removes this side of it, and records why.

- **The hand-off is gone.** The description no longer sends diffs to `code-review`,
  and § Neighbouring skills is deleted. A trigger contract that names another skill is
  only as reliable as that skill's presence in the catalog: where it is not installed
  the instruction points at nothing, and where a *different* skill of the same name is
  installed it points at the wrong thing — which is what this repository turned out to
  contain.
- **This package stands alone.** It works on a file, a snippet, or a pasted diff, with
  no repository, tracker or companion skill assumed. The 24-smell table and the rules
  are self-contained.
- **Trade-off, stated rather than hidden.** With the boundary clause gone, "review this
  code" can again match both this skill and a review skill. Routing between skills is
  the catalog's job; a package cannot do it from inside its own description.
- **The reverse pointer stays optional.** A review skill may name this one for its smell
  vocabulary; that is integration on that side and does not make this package depend on
  it. v5's "both sides" claim is superseded by this entry.

## v5.1 — after review

> The review of `815e18e` found three P0s. This entry is the response; where v5 is
> corrected, the correction is stated rather than quietly edited into v5.

- **`T-11.3` was wrong.** Its "after" called `bookPremiumConcert` *and*
  `bookStandardConcert`, turning one booking into two — a behaviour change wearing a
  refactoring's clothes (H4), in the section that exists to teach the difference. One
  call site now calls one function.
- **`T-11.1` closes its loop.** The split dropped `alertForMiscreant`'s return value;
  the fragment now says callers that need the name call `findMiscreant`.
- **`T-10.4` added.** The polymorphism fragment was missing while `T-12.6` stood in
  for it. The two now show different jobs: moving behaviour onto types that already
  exist, versus creating the hierarchy. The fragments are a working set of thirteen,
  with no implied ranking.
- **The measurements reproduce.** `measurements.mjs` now seeds its shuffle and times a
  fixed amount of work, so the counts stop moving between runs. The numbers in
  `standard.md` are what the script prints: about 3.5–4× at 10³–10⁴ elements, about
  18–21× at 10⁵–10⁶, and 136 distinct totals. v5's "10³ indistinguishable (0.9×)" was timer noise —
  at that size the clock, not the pipeline, was being measured.
- **The boundary is real on both sides.** v5 said so, but only the installed
  `code-review` had the return pointer; `code-review/SKILL.md` in this repository now
  points at the 24-smell table too. v5 also called the review skill's dimension table
  "undefined" — this repository's review skill has one (Security, Crash, Logic, Error,
  Performance, Testability, Maintainability, Readability), and the standard now states
  its own omission directly instead of pointing sideways at it.
- **Eval material is versioned.** Probes, checker and measurement script moved from the
  git-ignored workspace into `../evals/coding-standard/`, so a change to the tests is a
  reviewable diff rather than invisible state.
- **Smaller:** the Naming glossary entry described the smell instead of the act;
  § Scope names T1–T4; the six-line threshold and the pipeline ratio each say they are
  starting points rather than rules.

## v5 — evidence, boundary, and the answer key
- **Evaluation material left the package.** `test-prompts.json` moved out of the
  shipped directory, next to `check.mjs` and `measurements.mjs`. The
  answer key used to sit in the shipped directory, protected only by an instruction not
  to read it; the file table no longer points at it.
- **`standard.md` C5 states measurements with conditions, not artifact ids.** The
  `eval-6` / `eval-7` / `replication/run-5` citations pointed into a git-ignored
  workspace that does not ship, so no reader could check them. Replaced with the
  measured behaviour and its conditions, and the sparse-array outcome corrected: a
  numeric hole gives the loop `NaN`, not a `TypeError`. (The first numbers quoted here
  were single samples; v5.1 replaces them with the ranges the script prints.)
- **Boundary with `code-review` stated on both sides.** This description now says
  file-or-snippet and sends diffs elsewhere; § Neighbouring skills states the split;
  the installed `code-review` skill points back here for the 24-smell table. Before
  this, two skills both answered "code review" from two diverging smell lists and
  neither mentioned the other. (Only the installed copy had the return pointer —
  v5.1 adds the repository's own.)
- **Facts fixed.** Glossary: Refused Bequest ch01 → ch03/ch12, Middle Man ch03 →
  ch03/ch07, and the Naming entry no longer attributes the "two hardest things" quip to
  ch03. ch10's worked example now shows an actual nested conditional as its "before"
  (it previously showed the answer twice). `standard.md` no longer gestures at "the
  review skill's dimension table", a reference no reader could resolve (see v5.1). § Scope admits
  that T1–T4 trace to ch04 practices, not to a ch03 smell or a ch06–ch12 technique. The
  stale `argument-hint` reference is gone.
- **Review routing fixed.** A review now loads the smell table with the rules; before,
  the row called `standard.md` "the whole checklist" and left the smells to be
  inferred from `Signal` fields.
- **Before/after fragments** for the twelve most-used techniques in `patterns.md`, so
  Track B's "at least one fragment" can be shown from the package rather than invented.
- **Thresholds say what they are.** ~Six lines marks where the question starts, not a
  quota; the pipeline performance number carries its size and language.
- **The package is versioned.** `git log` here is the history this file only summarises.

## v4 — trigger surface fits the catalog budget
- `description` 792 → 294 characters. The catalog truncates at 500, so the Chinese
  trigger words and the scenario routing used to be cut off before the model saw them.
- Removed `(2nd ed.)`, the 24/61/31 inventory and the scenario/file-routing sentence —
  all of it either already in this body or paid for out of the trigger budget.
- Dropped the Claude Code `argument-hint` comment; this runtime does not read it.
- Replaced a file-table row pointing at a non-existent `evals/` directory with the
  500-character maintenance rule.
- Fixed the standard's self-description: **27 rules + 4 NON-BOOK hazards**, not "31 rules
  with five identical fields" (the hazards carry three fields by design).

## v3 — correctness hazards split out
- Added H1–H4, marked NON-BOOK: precision, trust-boundary validation, ambiguous
  contracts, and behaviour-changes-ride-along. They leave as their own task, never
  inside a refactoring step.

## v2 — forward rules
- Added `standard.md`: 31 rule entries in 9 groups, read forward ("what must this
  satisfy?"), alongside the existing smell → remedy router in `cheatsheet.md`.
- Renamed from `refactoring-coding-standard`; description gained the Chinese triggers.

## v1 — the book, digested
- 24 smells, 61 refactorings and 13 chapter digests, routed by scenario.

## Eval material

Not in this directory. Probes with their expected answers live in
`../evals/coding-standard/test-prompts.json`; `check.mjs` (inventory, ids, links,
glossary consistency) and `measurements.mjs` (the numbers quoted in `standard.md` C5)
sit beside it. Nothing carrying an expected answer ships inside the package.
