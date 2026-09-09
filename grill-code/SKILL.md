---
name: grill-code
description: >
  One-shot code workflow: grill the design, document the domain, force the
  laziest refactoring that still works. Use when the user says "grill-code",
  "grill the code", "challenge and refactor this", or "review and simplify".
disable-model-invocation: true
argument-hint: "[target: file, module, diff, or design]"
---

# Grill Code

Call the Skill tool once per skill, in order; carry each skill's instructions
forward — later skills stack on earlier ones.

## Steps

1. `ponytail` — what is allowed to exist. Out: the ladder ruling per piece
   (exists / reuse / stdlib / delete).
2. `refactoring-coding-standard` — smells to refactorings. Out: one ordered
   refactor path, each step with its verification, plus the therapies you
   excluded and why.
3. `grilling` — grill the design. Out: one round of numbered questions, each
   with a recommended answer.
4. `domain-modeling` — write the docs the answers settle. Out: the CONTEXT.md
   / ADR writes, or "none" plus the one-line reason nothing was writable yet.

Pass the user's arguments through; ponytail also takes `lite|full|ultra`.

## Output

In this order, no prose between sections:

```
## 1. Grill verdict        — what should not exist; one ruling per item
## 2. Design questions      — Q1..Qn, each with "➡️ <recommended answer>"
## 3. Docs                 — files written (CONTEXT.md / ADR path), or "none"
## 4. Refactor plan        — ordered steps: smell → therapy → verification
## 5. Code                 — the lazy version, smallest diff
```

Sections 1-4 are bullets and tables, never paragraphs. Section 5 is the only
place with code, code before its three lines of explanation. When the
refactoring checkpoint blocks edits (no test suite, public API, multi-file),
section 5 is the plan's code as a paste, not a file write, and section 4 says
so. "just build it": skip section 2, state "interview skipped", still emit
1, 4, 5.

## If X fails → do Y

| X | Y |
|---|---|
| a wrapper (`grill-code`, `grill-with-docs`, `grill-me`) refused | user-only: load `grilling` then `domain-modeling`; never ask for a slash command |
| the target is not in the workspace | say which path you searched, ask for the path or pasted source |
| a comment says "do not delete", the user says delete | user ruling wins; one line, git keeps the history |
| no test covers the target | plan only, no file edits |

## Checkpoints

- 🔴 Code lands only after the user answers section 2. Plan and paste until
  then.
- 🛑 One round, then stop: show the ruling, the plan and the verification
  result, then wait. Do not start round two on your own.

## Do not

- Do not call the wrappers with the Skill tool — user-only, refused.
- Do not re-ask what the user answered, or re-interview what the code settles.
- Do not invent a target: no file, no refactor.
- Do not edit files before section 2 is answered, or when no test covers the
  target.
- Do not silently drop a step: one line naming the reason.
- Do not pad the sections with prose, restated requirements, or a tour of the
  skills you loaded.
- Do not open chapters while the cheatsheet can decide the smell.
- Do not offer the full version of a thing the user did not ask for.
