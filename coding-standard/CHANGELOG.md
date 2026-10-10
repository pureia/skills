# Changelog — coding-standard

Sections are gists, not diffs: what changed about how the skill behaves or is loaded.
Git holds the full history.

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
Not in this directory. Probes and expected answers ship as `test-prompts.json`
(evaluation material — never a loading target); runnable eval sets, checks and fixtures
live in the git-ignored `coding-standard-workspace/`.
