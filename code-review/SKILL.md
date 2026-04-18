---
name: code-reviewer
description: "Reviews code for correctness, maintainability, and project standards. Invoke when user asks for code review or before merging changes."
---

# Code Reviewer

From the perspective of a code review expert, use this skill to guide the agent to conduct professional and thorough code reviews of local development changes. The goal is to provide actionable and high-significance feedback to balance strict correctness/safety and long-term code health.

## Workflow

### 1. Identify Changes
*   Check status: `git status`
*   Read diffs: `git diff` (working tree) and/or `git diff --staged` (staged).
- **If no changes**: Inform the user "No local changes found to review." and stop.
- **If changes exceed 1500 lines or 10 files**: Focus on core logic files first; group findings by module and output in batches rather than reviewing every line equally.

### 2. In-Depth Analysis & Confidence Thresholds
> Read surrounding code context for modified files to understand intent. Check project config files to align with the project's own style and rules.

Analyze changes against the following dimensions. **Only report issues that meet the specified confidence threshold**. When in doubt, raise questions.

| Dimension | Severity & Threshold | Core Focus (Quick Reference) |
| :--- | :--- | :--- |
| **Security** | **CRITICAL ≥95%** | Injection, XSS, auth bypass, hardcoded secrets |
| **Crash & Data Loss** | **CRITICAL ≥95%** | Unhandled rejections, null pointers, infinite loops |
| **Logic & Correctness** | **WARNING ≥85%** | Race conditions, off-by-one, incorrect async, edge cases |
| **Error Handling** | **WARNING ≥85%** | Swallowed exceptions, missing try/catch, brittle assumptions |
| **Performance & Leaks** | **WARNING ≥85%** | N+1 queries, memory leaks, blocking I/O |
| **Maintainability** | **SUGGESTION ≥80%** | Testability, magic numbers, missing JSDoc, tight coupling |
| **Readability** | **SUGGESTION ≥75%** | Misleading names, inconsistent conventions, excessive length |

#### Expanded Guidance for Analysis
When performing in-depth review, use the following prompts to guide your inspection of each dimension:

- **Security**: Does this change introduce vulnerabilities that compromise confidentiality, integrity, or availability? Check for unsanitized input reaching database queries, user-controlled HTML rendering, missing authorization checks, or exposed secrets in logs/config.
- **Crash & Data Loss**: Could this code cause the application to terminate or corrupt persistent state? Verify that Promises are handled, optional chaining protects against nulls, and loops have guaranteed exit conditions.
- **Logic & Correctness**: Does the code achieve its stated purpose without bugs? Examine boundary conditions (empty arrays, zero values), async ordering, and boolean short-circuiting.
- **Error Handling**: Does the system degrade gracefully under failure? Look for try/catch blocks that silently ignore errors, failed network requests left unhandled, or missing validation on external data.
- **Performance & Leaks**: Are there observable bottlenecks or resource leaks? Consider repeated queries inside loops, event listeners not cleaned up in useEffect/onUnmounted, or synchronous operations blocking the main thread.
- **Maintainability**: Will a future developer struggle to change or test this code? Identify magic numbers without named constants, public functions lacking JSDoc, or deep coupling that prevents isolated unit testing.
- **Readability**: Can intent be understood quickly? Flag variable names that misrepresent purpose, comments that contradict code, or functions exceeding ~50 lines without clear logical breaks.

**Silent Rules (Do NOT Report):**
- Subjective stylistic preferences (tabs vs spaces) **unless they violate an explicit rule found in project config files.**
- Minor naming nitpicks that do not impair clarity.
- Suggestions with confidence below the stated threshold.

**Confidence Calibration:**
Before reporting any issue, internally verify:
1. *Is this code actually broken or risky right now?* (If yes, escalate to Critical/Warning.)
2. *Could a reasonable developer disagree that this is an issue?* (If yes, lower confidence or drop.)

### 3. Provide Feedback

#### Output Structure

**Summary**
2–3 sentences summarizing the change intent and overall health assessment. If no issues found, state this explicitly.

**Issues Found**
| Severity | File:Line | Issue | Confidence |
| :--- | :--- | :--- | :--- |
| CRITICAL | `src/auth.ts:42` | SQL injection via raw query concatenation | 98% |
| WARNING | `utils/api.ts:15` | Missing error catch leads to unhandled rejection | 90% |
| SUGGESTION | `hooks/useData.ts:88` | Extract magic number `86400` to named constant | 85% |

*If no issues meet thresholds:* `No issues meeting confidence thresholds found.`

**Detailed Findings**
For each issue listed:
- **File:** `path:line`
- **Problem:** Concise explanation of why this matters.
- **Suggestion:** Code block or clear instruction for resolution.

**Conclusion**
Select one: `APPROVE` | `APPROVE WITH SUGGESTIONS` | `NEEDS CHANGES`
*Format: Output the verdict on a new line after the detailed findings, e.g., `VERDICT: APPROVE WITH SUGGESTIONS`.*

### 4. Follow-up Interaction
If recommendation is **APPROVE WITH SUGGESTIONS** or **NEEDS CHANGES**:
- Offer to **Generate Fix Patches** or **Explain the Context** for deeper understanding.

## Tone Guidance
- **CRITICAL / WARNING**: Direct, unambiguous, focused on impact. Be firm but not alarmist.
- **SUGGESTION**: Collaborative and constructive. Use phrasing like *"Consider extracting this to improve testability..."* rather than *"Don't do this."*
- **APPROVAL**: Acknowledge the value of the contribution specifically and positively.
