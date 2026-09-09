---
name: grill-code
description: >
  One-shot code workflow that dispatches to three skills in order: grill the
  design, document the domain, then force the laziest refactoring that still
  works. Use when the user says "grill-code", "grill the code", "challenge and
  refactor this", "review and simplify", "code grill", or asks for a code
  review that both questions the design and ships a minimal refactor.
disable-model-invocation: true
argument-hint: "[target: file, module, diff, or design]"
---

# Grill Code

Load each skill below by calling the Skill tool once per skill, in this order.
Carry every skill's instructions forward — later skills stack on earlier ones.

## Steps

1. `ponytail` — set the bar for what is allowed to exist. Out: the ladder
   ruling on each proposed piece of code (exists / reuse / stdlib / delete).
2. `refactoring-coding-standard` — route smells to refactorings. Out: one
   ordered refactor path, each step with its verification, plus the therapies
   you excluded and why.
3. `grilling` — grill the design. Out: one round of numbered questions
   with a recommended answer each.
4. `domain-modeling` — write the docs the answers settle. Out: the
   CONTEXT.md / ADR writes, or "none" plus the one-line reason nothing was
   writable yet.

   The wrappers `grill-with-docs` and `grill-me` are user-only; calling them
   returns "not available for model invocation". Never call them — call the
   members above.

Pass the user's arguments through with each call (`/grill-code <target>` →
the same target; ponytail also takes `lite|full|ultra`).

## Rules

- One Skill call per skill. A skill that returns "call the Skill tool for X"
  means call X next — chain it, do not re-call the wrapper.
- After each skill returns, hold its instructions and follow them. Do not
  re-call a skill you already loaded in this session.
- A skill that fails to load: say so in one line, continue with the rest.
- The wrapper names are user-only: `grill-with-docs` and `grill-me` are
  rejected for model invocation. Load `grilling` and `domain-modeling`
  instead. Never ask the user to type a slash command for you.
- Conflicts between skills — user ruling wins; otherwise precedence is
  ponytail (what should exist) → grilling/domain-modeling (what the design
  should be) → refactoring (how to get there). Name the conflict and the
  ruling you applied, one line each.
- `grilling` ends in an interview: ask its questions, then apply
  refactoring to the answers. Do not re-interview what the user already said.
- The refactoring skill's cheatsheet is the entry point; open chapters only
  when the cheatsheet cannot decide the smell.
- The refactor path is a plan, not an edit: apply the ponytail ruling and the
  refactoring plan to the code only after the design questions are answered.
- Output shape, in this order, no prose between sections:

```
## 1. Grill verdict        — what should not exist; the one ruling per item
## 2. Design questions      — Q1..Qn, each with "➡️ <recommended answer>"
## 3. Docs                 — files written (CONTEXT.md / ADR path), or "none"
## 4. Refactor plan        — ordered steps: smell → therapy → verification
## 5. Code                 — the lazy version, smallest diff
```

  Sections 1-4 are bullets and tables, never paragraphs. Section 5 is the
  only place with code, and the code comes before its three lines of
  explanation. When the refactoring skill's checkpoint blocks edits (no test
  suite, public API, multi-file scope), section 5 is the plan's code as a
  paste, not a file write, and section 4 says so.
- "just build it" / no time to grill: skip step 3's interview, run ponytail
  plus refactoring, and say the interview was skipped.
