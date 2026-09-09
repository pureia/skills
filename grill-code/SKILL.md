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

1. `ponytail` — set the bar for what is allowed to exist.
2. `refactoring-coding-standard` — route smells to refactorings.
3. `grill-with-docs` — grill the design, then write the docs it produces.

Pass the user's arguments through with each call (`/grill-code <target>` →
the same target; ponytail also takes `lite|full|ultra`).

## Rules

- One Skill call per skill. A skill that returns "call the Skill tool for X"
  means call X next — chain it, do not re-call the wrapper.
- After each skill returns, hold its instructions and follow them. Do not
  re-call a skill you already loaded in this session.
- A skill that fails to load: say so in one line, continue with the rest.
- Conflicts between skills — user ruling wins; otherwise precedence is
  ponytail (what should exist) → grilling/domain-modeling (what the design
  should be) → refactoring (how to get there). Name the conflict and the
  ruling you applied, one line each.
- `grill-with-docs` ends in an interview: ask its questions, then apply
  refactoring to the answers. Do not re-interview what the user already said.
- The refactoring skill's cheatsheet is the entry point; open chapters only
  when the cheatsheet cannot decide the smell.
- Output: grill verdict → docs written → ordered refactor plan → the lazy
  version of the code. Code first, three lines of explanation at most.
- "just build it" / no time to grill: skip step 3's interview, run ponytail
  plus refactoring, and say the interview was skipped.
