# `coding-standard`: one standard, written forward, in English

`refactoring-coding-standard` — a Chinese skill synthesized from *Refactoring*, 2nd ed. —
was repositioned as **`coding-standard`**: the same knowledge base read forward. It now
covers five scenarios (write new code / add a feature / review / refactor / learn), with a
new `standard.md` of 31 rules (rule → smell → counter-example → remedy → verification)
alongside the existing smell → remedy router. The body is English; the description keeps
Chinese trigger phrases, because the request that reaches the skill is often Chinese even
when the standard is not. The 13 chapter digests keep the book's own structure rather than
being regrouped by topic, so every `chNN` citation stays stable.

## Considered options

- **Leave it Chinese and refactoring-only.** Rejected: the most common request — "how
  should this be written?" — had no entry point. The loading ladder was keyed to *what is
  wrong*, never to *what am I building*.
- **Add style and formatting rules.** Rejected: casing, indentation, import order and file
  layout are already decided by each project's linter and formatter. A rival rule set would
  put the skill in conflict with the tooling that actually owns those questions.
- **Merge `code-review` into it.** Rejected: a triggered skill loads in full, so one file
  holding the rules, the 61 techniques *and* the review workflow pays that context cost on
  every invocation. They stay separate and point at each other.
- **Regroup the chapters by topic (naming / functions / data / …).** Rejected: it breaks
  every `chNN` citation and makes old-versus-new evaluations incomparable. The topic
  grouping lives in `standard.md`'s nine groups instead.
- **Keep the pre-existing red-bar gate for everything.** Rejected: writing new code has no
  previous behaviour to preserve, so there is no baseline to be green. The gate now applies
  to changing existing code; new code must ship with its own test instead.

## Consequences

- Rules the book cannot justify are fenced off as **Correctness hazards (H1–H4)** and are
  always executed as a separate task: a refactoring preserves observable behaviour, so a
  validation, precision or contract fix must never ride along with a structural change.
- Renaming the skill broke a hard reference in `grill-code` (updated), and the live
  `code-review` skill now points here for the fuller form of its smell baseline.
