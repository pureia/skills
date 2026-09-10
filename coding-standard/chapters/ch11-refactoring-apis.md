# Ch11 — Refactoring APIs

## Core Idea
The API group makes an interface concise and to the point: separate queries from modifiers, parameterize or de-flag, pass whole objects, convert between parameters and queries, and replace dated constructor/verb-function shapes with factories and commands.

## Frameworks Introduced

### Separate Query from Modifier（将查询函数和修改函数分离）
- Motivation: a function both returns a value and changes data — callers easily overlook the side effect; with multiple threads it is more dangerous
- Mechanics: ① copy out a query function (read-only) ② at the copied site add a helper: fold the side effect into the modifier function ③ change the original function to call the query ④ adjust every caller ⑤ test
- Key point: the naming convention is the house speciality — if `total()` has a side effect, the name lies too

### Parameterize Function（函数参数化）
- Motivation: two functions are almost identical, differing only in a literal (Duplicated Code)
- Mechanics: ① write a parameterized function matching both the old and the new function (optionally: start from one of them) ② switch the callers over one by one ③ delete the old function ④ test
- Judgment signal: only the value differs inside the body → a parameter; the behavior pattern differs → do not force parameterization

### Remove Flag Argument（移除标记参数）
- Motivation: the argument is used only to decide which path to take (`isMale ? ... : ...`), and the call site says little
- Mechanics: ① split into several named functions by the meaning of the flag value (or keep a named boolean wrapper) ② make each call site use an explicit function name ③ test; the two function bodies may also share a private implementation
- Key point: a named function can be more self-describing than a "boolean + parameter overload", and it is easier to change when one branch later becomes more independent

### Preserve Whole Object（保持对象完整）
- Motivation: the caller pulls a pile of fields out of an object to pass them; the signature is long and depends on "what each field is called"
- Mechanics: ① change the signature to take the object ② read the needed fields inside the body ③ update the callers ④ test
- Counter-consideration: when the object is a "bare bag of variables", splitting it apart is clearer (distinguish "is this really an aggregate of data")

### Replace Parameter with Query（以查询取代参数）
- Motivation: the argument passed at the call site is a property on the same object — the parameterization actually adds to "the caller's knowledge burden"
- Mechanics: ① find the call sites of the called function ② inside the function, obtain the value from a query it can reach ③ delete the parameter, test; if some caller does not have that data → keep a parameter overload (the "the parameter is the exception" case)

### Replace Query with Parameter（以参数取代查询）
- Motivation: the function reaches directly for a global/remote query inside; both testing and understanding need "an isolated input"
- Mechanics: ① add a parameter to receive the value ② the caller computes the inseparable value and passes it in ③ test
- Benefit: coupling to user interaction/the environment moves out of the function body to the call site

### Remove Setting Method（移除设值函数）
- Motivation: a field should be set only at construction time; exposing a setter makes the object forever mutable
- Mechanics: ① examine every call site of the setter ② move the "assign after construction" call sites into the constructor/factory ③ delete the setter ④ test
- Benefit: immutable semantics, a narrower scope

### Replace Constructor with Factory Function（以工厂函数取代构造函数）
- Motivation: in JS and similar languages a constructor must use `new`, is anonymous, and cannot choose a subclass/return type by type
- Mechanics: ① create a `createXxx` factory function ② return new inside the body ③ replace the call sites one by one ④ test; then extract the parameter differences into multiple factories
- Benefit: an entry point with a semantic name (such as `createEmptyDateRange`), and the ability to return subtypes

### Replace Function with Command（以命令取代函数）
- Motivation: the function has too many parameters/temporary variables; you want to execute it step by step with state (the execute pattern); you want to encapsulate "several calls of one algorithm"
- Mechanics: ① create a class whose fields carry the context ② split the body into several methods ③ a top-level method `execute()` ④ construct the context, call execute ⑤ replace the call sites ⑥ test; (often paired with splitting into a "three-step" command)

### Replace Command with Function（以函数取代命令）
- Motivation: a command class left with a single method is over-structure (Lazy Element); the same when the command is "use once and discard"
- Mechanics: ① identify the command ② turn execute's context parameters into function parameters ③ collapse it into an ordinary function ④ delete the class ⑤ test

## Mental Models
- **The honesty of a function signature**: do not pass a parameter that a query could obtain; a query that changes data must be split apart; a flag argument is a "hidden branch"
- **Factory vs constructor**: a learned name for the entry point, and dynamic return types are the factory's essential advantage
- **Command vs function**: need "stepwise control of a complex algorithm / a reused context" → command; a simple call → function
- **Replacing parameters and queries in both directions**: who is the "input", who depends on the environment — when testing, choose the other way round

## Worked Example
Remove Flag Argument: `setDimension(name, value)` with `width`/`height` branches — before and after the refactoring:
```javascript
// before
setDimensions("width", 5); setDimensions("height", 10);
// after
setWidth(5); setHeight(10);  // share a private implementation inside
```
- **What it demonstrates**: a boolean/enum flag argument hides the "intent" inside the boolean; once it is deleted, the call site explains itself

## Key Takeaways
1. Separate Query from Modifier is the bottom line
2. Two functions differing only in a literal → parameterize; a parameter used only to choose a path → remove it
3. Pass an object vs pass fields: if the object passed is a "real aggregate", Preserve Whole Object
4. A field that is immutable after construction: delete the setter; an implementation that must be chosen by meaning: use a factory
5. A command is a "storage box for function complexity": it can be packed up and executed, and it must also collapse back

## Connects To
- **ch03**: Long Parameter List, Duplicated Code, Lazy Element, Mutable Data
- **ch06**: Change Function Declaration（改变函数声明）is the paperwork for a signature change
- **ch07**: Encapsulate Variable（封装变量）/ Remove Middle Man（移除中间人）serve the ambition of "immutability"
- **ch13**: index of this group of refactorings
