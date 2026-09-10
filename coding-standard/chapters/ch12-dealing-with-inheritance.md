# Ch12 — Dealing with Inheritance

## Core Idea
The inheritance group moves things between levels of abstraction (up and down), replaces type codes with subclasses, and replaces inheritance that should not be shared with delegation. The core judgment: **inheritance is an "is-a" relationship (a shared interface + implementation), delegation is a "has-a" relationship — when the inheritance is wrong, change it to delegation without hesitation.**

## Frameworks Introduced

### Pull Up Method（函数上移）
- Motivation: the subclasses have the same function (real Duplicated Code) → raise it to the superclass
- Mechanics: ① confirm the function is identical in the subclasses (if not, align it first with Slide Statements / a shared helper) ② add the function to the superclass ③ delete the subclass copies ④ test; when the subclasses differ in detail → use a template method (superclass main flow + subclass specifics)

### Pull Up Field（字段上移）
- Motivation: the subclasses have the same field (especially when both need to reference the same data)
- Mechanics: ① check every use of the field ② if it is used only in the subclass, push it down / replace it first (a constructor parameter straight through) ③ move the field to the superclass ④ test

### Pull Up Constructor Body（构造函数本体上移）
- Motivation: the first part of the subclass constructors is identical (super first, then subclass fields)
- Mechanics: ① confirm the subclasses can all share that piece of code ② pull the common body up into the superclass constructor ③ adjust the subclass constructor parameters (use a parameter object to reduce them) ④ test

### Push Down Method（函数下移）
- Motivation: a superclass function is meaningful to only one subclass; clean up before abstracting the superclass
- Mechanics: ① copy the original function into the subclass, delete the superclass definition ② test; the two-step move avoids breaking the interface (optionally: keep a forwarding shell first)

### Push Down Field（字段下移）
- Motivation: the field is used by only some of the subclasses
- Mechanics: ① find which subclass uses the field, declare it in that subclass first ② the common references keep indirect access ③ test ④ delete the superclass field

### Replace Type Code with Subclasses（以子类取代类型码）
- Motivation: a string/number type code drives conditional behavior; the type code carries the semantics of "a set of possible variants"
- Mechanics: ① determine a finite set of states/variants ② build subclasses (a factory function returns a subtype by code) ③ push the polymorphism-related behavior down one by one; replace the conditional branches with virtual-function overrides ④ test class by class
- Note: no need to subclass when the branches are already small and stable

### Remove Subclass（移除子类）
- Motivation: a subclass differs by only a little / one subclass is never used (superfluous structure); or the subclass disappears once delegation replaces it
- Mechanics: ① fold the subclass behavior into the superclass ② delete the subclass ③ the factory returns the superclass ④ test

### Extract Superclass（提炼超类）
- Motivation: two classes share many fields/methods (Duplicated Code, Alternative Classes with Different Interfaces); the "is-a" relationship holds
- Mechanics: ① create an abstract superclass ② pull up fields ③ pull up methods ④ repeat (compile–test) ⑤ consider pushing it flat: no subclass is forced to use everything in the superclass (the superclass may carry defaults/blank implementations)
- Alternative path: if the two classes are too independent → merge them into a "combination" (delegation) rather than inheritance

### Collapse Hierarchy（折叠继承体系）
- Motivation: the difference between superclass and subclass no longer means anything (the subclass is drained / the superclass means nothing special)
- Mechanics: ① move the remaining subclass behavior to the superclass ② delete the subclass ③ change the constructors/factories ④ test

### Replace Subclass with Delegate（以委托取代子类）
- Motivation: the subclass inherits the "implementation" but refuses the "interface" (Refused Bequest); or the "has-a relationship" fits better than "is-a" (the varying dimension of the object)
- Mechanics: ① create a delegate field for the variable part of the subclass/object being delegated ② the delegate type holds that behavior (a class + forwarding functions) ③ change the superclass/interface into an aggregate ④ test; example: manager vs employee — the role uses delegation, the identity uses inheritance
- When: only part is shared between subclass and superclass; two dimensions changing at once (such as "person × retired or not") calls for delegation

### Replace Superclass with Delegate（以委托取代超类）
- Motivation: only part of the superclass behavior is needed, but the interface exposes all of it (refusing the interface); or "composition beats inheritance"
- Mechanics: ① aggregate the useful superclass behavior into a new field ② build forwarding functions (an interface just wide enough) ③ delete the inheritance relationship ④ test
- Benefit: only the behavior that is needed is exposed; other interfaces no longer leak

## Mental Models
- **"is-a" vs "has-a"**: when `Manager` is-a `Employee` holds but drags in an interface the bosses do not need, switch to "Manager holds Employee"
- **The evolution type code → polymorphism → subclass/delegation**: Repeated Switches → Replace Type Code with Subclasses → polymorphism; when variants keep growing or change along multiple dimensions → delegation
- **An abstract class does not force blank implementations**: the traditional dogma that "a superclass must be abstract" is not the norm; refusing to inherit the implementation is fine, refusing to inherit the interface is the problem

## Worked Example
Replace Subclass with Delegate: the `Booking` base class and the `PremiumBooking` subclass (premium changes only part of the behavior). Refactor to: a `Booking` member holding a `premiumDelegate` (created lazily), `hasPremium() => this._premiumDelegate`, the "surcharge part" methods implemented by the delegate object, and `Booking` overrides checking the delegate first. Step by step: ① create the delegate object ② keep the delegate field in Booking ③ move the subclass-specific logic into the delegate ④ preview the "booking is no longer premium" scenario changing over time — delegation makes splitting the dimension possible.

## Key Takeaways
1. The same function/field in subclasses → pull up; used by only some subclasses → push down
2. Type code + switch → subclassing → polymorphism; more branches/multiple dimensions → delegation
3. A drained subclass → collapse; an oversized superclass → extract a superclass or switch to delegation
4. Inheritance is for sharing an interface + implementation; sharing only unrelated details → use delegation
5. Pull the common part of constructors up, and use a parameter object to narrow the parameters

## Connects To
- **ch03**: Duplicated Code, Refused Bequest, Repeated Switches, Speculative Generality
- **ch10**: Replace Conditional with Polymorphism（以多态取代条件表达式）(combined with Replace Type Code with Subclasses)
- **ch06**: Combine Functions into Class（函数组合成类）(constructing the delegate object)
- **ch13**: index of this group of refactorings
