# Ch05 — Introducing the Refactoring Catalog

## Core Idea
This chapter introduces how to use the refactoring catalog: every refactoring is recorded in a uniform format — name (including aliases), sketch, motivation, mechanics, examples — and the catalog is a “reference tool” to consult as needed, not a book to read cover to cover.

## Frameworks Introduced
- **The catalog's record format (5 parts)**:
  - **Name**: the key to building a refactoring vocabulary; common aliases are listed
  - **Sketch**: a small piece of code showing the transformation, to help you recall it (on first contact, read the examples)
  - **Motivation**: why to do it, and when not to
  - **Mechanics**: a checklist of small steps, with testing at every step; “take small steps — the more complicated the situation, the smaller the steps must be”
  - **Examples**: a minimized, textbook-style illustration; some simple refactorings have no example
- **The criteria for selecting refactorings**: commonly used, worth naming, able to raise your overall skill or add significantly to design quality; reverse refactorings are mostly not listed separately (Encapsulate Variable is rarely done in reverse); refactorings that are too small (such as Slide Statements) did not enter the catalog in the early days

## Key Concepts
- **Baby steps**: in real work you often take bigger steps than the catalog suggests; as soon as something goes wrong, undo and switch to smaller steps
- **The value of a vocabulary**: names can be reused as a meta-language across the team and in tools (IDE automated refactorings)
- **Colour marking in the examples**: the book highlights the code that was modified; when too high a proportion is highlighted, nothing stands out (to keep the emphasis from being drowned)

## Mental Models
- **The catalog is a recall tool**: when you know which refactoring to use but cannot remember the steps, read the mechanics only; on first use, read both the mechanics and the examples
- **Every refactoring has a reverse**: whether to record it depends on whether the reverse is commonly used or interesting

## Anti-patterns
- **Reading the catalog cover to cover as a textbook**: it is first of all a reference manual; the examples are simplified to explain one refactoring and are not good business modeling
- **Copying the catalog's simple examples into complex situations**: the examples are scaffolding, and real use requires adapting them to the context

## Worked Example
Use case: you have not done “Move Statements to Callers” for over a month and cannot recall the details → look up that entry's mechanics checklist: confirm the callers, move them one by one, delete the original statements, test — and follow it as written instead of working from impressions.

## Key Takeaways
1. Every entry in the refactoring manual follows the same format; learn to locate the technique you need from its “sketch”
2. Mechanics are the safety baseline: test after each step; “take small steps — the more complicated the situation, the smaller the steps”
3. The catalog only includes the most commonly used / most valuable techniques — do not be puzzled by refactorings that are “not listed”
4. The record format is itself a form of knowledge management: name-sketch-motivation-mechanics-examples

## Connects To
- **ch06–ch12**: the body of the catalog (the first set of refactorings / encapsulation / moving features / data / conditionals / APIs / inheritance)
- **ch13**: the full catalog index (English/Chinese/chapter) + the smell → refactoring quick-reference table
- **ch05 (this chapter's Frameworks Introduced)**: the criteria for selecting refactorings (commonly used, worth naming, improving skill/design quality) — this skill's 61 items are included on that basis
