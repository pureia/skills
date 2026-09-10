# Ch08 — Moving Features

## Core Idea
The moving group solves "this thing is in the wrong place": functions, fields and statements move between modules, loops become pipelines, dead code goes away. The heart of refactoring across module boundaries is "where the data is, that is where the behavior belongs".

## Frameworks Introduced

### Move Function（搬移函数）
- Motivation: the function does not fit the module it sits in (Feature Envy, Insider Trading); or its behavior sits closer to some other data/context
- Mechanics: ① examine the function's context: who calls it, what it calls, what data it uses ② choose the new host (the module that holds most of the data the function uses) ③ copy with the smallest possible change (forward by delegation until the migration is done) ④ change the callers ⑤ delete the old function ⑥ test; when moving across modules watch for special cases (recursion, iteration) and the visibility of private members
- Key point: judge "which module owns most of the data it uses"

### Move Field（搬移字段）
- Motivation: the field lives in A but always changes together with B's data / is accessed more by B's functions; or some fields make sense only in certain situations
- Mechanics: ① examine every place the field is read and written ② create the field in the new host ③ replace the old field with the new one (you may copy + delegate first, then delete) ④ test
- Ordering strategy: move the field first, then move the functions that use it

### Move Statements into Function（搬移语句到函数）
- Motivation: statements scattered around the callers are strongly related to some function, and you want to remove duplication / make the function whole
- Mechanics: ① confirm the statements to move have been gathered into one place (Slide Statements first) ② transplant them into the target function ③ delete the original statements ④ test; if the statements use more of the surrounding data, the direction may be the reverse (move out) or Extract Function

### Move Statements to Callers（搬移语句到调用者）
- Motivation: some statements in a function apply only to some callers (optional behavior hard-coded into the callee)
- Mechanics: ① find the block of statements to move ② cut it out of the function (leave it empty / leave a placeholder for now, e.g. an empty function) ③ copy the statements into every caller, one at a time ④ test; the same for several callers → consider Parameterize Function

### Replace Inline Code with Function Call（以函数调用取代内联代码）
- Motivation: a run of statements duplicates what an existing function already does
- Mechanics: ① confirm the existing function's behavior is equivalent to this code ② judge the functionality: if using the existing API does not quite fit, change or write a function first ③ replace ④ test

### Slide Statements（移动语句）
- Motivation: put related code together, creating the conditions for extraction/merging
- Mechanics: ① check that the move is safe (do the two fragments depend on the same variable, do side effects order them) ② move the fragment in place ③ test; mind the boundary of moves inside a loop

### Split Loop（拆分循环）
- Motivation: one loop does several different things — poor readability, hard to name (an extraction signal)
- Mechanics: ① copy the loop keeping only the first concern, delete the others ② build a new loop for the second concern ③ repeat until every concern has its own loop ④ test
- Note: do not hold back out of performance regret — several loops can be merged back into a pipeline too

### Replace Loop with Pipeline（以管道取代循环）
- Motivation: a loop hides "what is processed / how it is processed"; in the age of first-class functions, reach for map/filter/reduce
- Mechanics: ① build the new pipeline, parallel to the loop logic ② step by step: replace a piece of the loop with a pipeline operator (filter/map), each small step testable ③ delete the old loop ④ test
- Benefit: the elements and the processing actions are immediately visible

### Remove Dead Code（移除死代码）
- Motivation: functions/fields/classes/branches nobody calls — check comments, test references and conditional branches too
- Mechanics: ① clean up the references (including comments, exception branches, implicit reflective calls) ② delete the code ③ test
- Key point: version control keeps the history; there is no need to "keep it just in case"

## Mental Models
- **Direction of the move = ownership of the data**: the function follows the data it uses most; move fields before functions
- **Two directions for moving statements**: gather into the function (remove duplication) vs scatter out to the callers (remove conditionals) — the choice rests on "whom does this statement apply to"
- **The end of the loop era**: a pipeline is the syntax of intent; dead code has no benefit beyond the cost of carrying it

## Worked Example
Replace Loop with Pipeline: turn `for (const p of people) { if (p.age >= 18) adult.push(p.name); }` into `const adult = people.filter(p => p.age >= 18).map(p => p.name);` — add filter and verify, then add map and verify, then delete the loop.

## Key Takeaways
1. Moving between modules: fields first, then functions; use delegation/shells to keep every step compilable
2. Move Statements to Callers: put statements that apply "only to some" back into the callers' hands
3. Slide Statements to gather similar code together before extracting
4. Splitting a loop is not a performance concern — one thing per loop
5. Dead code is deleted; version control is its only memorial

## Connects To
- **ch03**: Feature Envy, Insider Trading, Duplicated Code, Shotgun Surgery, Loops, Lazy Element
- **ch06**: Extract Function（提炼函数）/ Inline Function（内联函数）often work alongside a move
- **ch07**: Hide Delegate（隐藏委托关系）= the delegation variant of Move Function
- **ch13**: index of this group of refactorings
