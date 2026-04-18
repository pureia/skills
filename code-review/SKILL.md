---
name: code-reviewer
description: "Reviews code for correctness, maintainability, and project standards. Invoke when user asks for code review or before merging changes."
---

# Code Reviewer

From the perspective of a code review expert, use this skill to guide the agent to conduct professional and thorough code reviews of local development changes. The goal is to provide actionable and high-significance feedback to balance strict correctness/safety and long-term code health.

## Workflow

### 1. Identify Changes
*   Check status: `git status`
*   Read diffs: `git diff` (working tree) and/or `git diff --staged` (staged). Also check untracked files with `git ls-files --others --exclude-standard`.
- **If no changes (including untracked files)**: Inform the user "No local changes found to review." and stop.
- **If changes are extensive**: Focus on core logic files first; group findings by module and output in batches rather than reviewing every line equally.

### 2. Collect Review Context (CRITICAL FOR ACCURACY)

*Before analyzing, gather sufficient context. **Do not rely on `git diff` fragments alone.** *

#### 2.1 Read Full Files
- For every file with changes, read the **entire file content** (not just the diff hunks).
- This is mandatory to understand surrounding logic, function signatures, and imports.
- **Exception**: If a file exceeds 500 lines, read only the changed functions and their surrounding 50 lines instead of the entire file.

#### 2.2 Read Related Test Files
- If a changed file has a corresponding test file (e.g., `src/foo.ts` → `tests/foo.test.ts`), read that test file as well.
- Absence of test coverage for new logic is itself a finding (report as WARNING under **Testability**).

#### 2.3 Read Project Configurations
- Locate and read **ONE** of the following (whichever exists):
  - Linter config: `.eslintrc.*`, `prettier.config.*`, `pyproject.toml`, `ruff.toml`, `.rubocop.yml`, `checkstyle.xml`
  - Type/Language config: `tsconfig.json`, `Cargo.toml`, `go.mod`, `pom.xml`, `build.gradle`
- Use these to **suppress style nitpicks** that the project's tooling already enforces.

#### 2.4 Explicit Skip List
- **Do NOT review** the following file types, even if they appear in `git status`:
  - Lock files (`package-lock.json`, `yarn.lock`, `Cargo.lock`, `poetry.lock`)
  - Minified bundles (`*.min.js`, `*.min.css`)
  - Generated code (`*.pb.go`, `*.graphqlgen.ts`, `__pycache__/`)
  - Binary files and images

### 3. In-Depth Analysis

*Before filing any issue, briefly summarize the intent of each changed file in one sentence. Understanding purpose prevents false positives.*

Analyze changes against the following dimensions. **Only report issues that meet the severity definitions.** When in doubt, raise questions.

| Dimension | Severity | Core Focus (Quick Reference) |
| :--- | :--- | :--- |
| **Security** | CRITICAL | Injection, XSS, auth bypass, hardcoded secrets |
| **Crash & Data Loss** | CRITICAL | Unhandled errors/exceptions, null/nil dereferences, infinite loops |
| **Logic & Correctness** | WARNING | Race conditions, off-by-one, incorrect async/concurrent flow, edge cases |
| **Error Handling** | WARNING | Swallowed exceptions, missing retry logic, brittle assumptions |
| **Performance & Leaks** | WARNING | N+1 queries, memory leaks, blocking I/O on critical paths |
| **Testability** | WARNING | Missing tests for new logic, untestable tight coupling |
| **Maintainability** | SUGGESTION | Magic numbers, missing documentation, unclear module boundaries |
| **Readability** | SUGGESTION | Misleading names, inconsistent conventions, excessive function length |

#### Severity Definitions

| Severity | Meaning | When to Use |
| :--- | :--- | :--- |
| **CRITICAL** | I am highly confident this is a problem that must be fixed immediately. | Security vulnerabilities, guaranteed crashes, data corruption risks. |
| **WARNING** | This is very likely a problem and strongly should be fixed. | Logic flaws, resource leaks, fragile error handling, missing tests. |
| **SUGGESTION** | This is a potential improvement for your consideration. | Readability, maintainability, minor performance optimizations. |

#### Expanded Guidance for Analysis

- **Security**: Does this change introduce vulnerabilities? Check for unsanitized input reaching interpreters (SQL, shell, OS commands), missing authorization checks, or secrets in logs/config.
- **Crash & Data Loss**: Could this code terminate the application or corrupt state? Verify error propagation, null/None/nil safety, and loop termination conditions.
- **Logic & Correctness**: Are there edge-case failures? Examine boundary conditions (empty collections, zero values), race conditions in concurrent/async code, and boolean short-circuiting.
- **Error Handling**: Does it degrade gracefully? Look for swallowed exceptions, missing retry logic for idempotent operations, and lack of validation on external data.
- **Performance & Leaks**: Are there resource bottlenecks? Identify repeated queries in loops, missing cleanup in lifecycle hooks (mount/unmount, init/destroy), or blocking I/O on critical paths.
- **Maintainability**: Will a future developer struggle? Flag magic numbers without named constants, missing function/class documentation, and tight coupling that prevents isolated unit testing.
- **Readability**: Can intent be understood quickly? Flag misleading variable names and functions exceeding reasonable length without clear logical breaks.
- **Testability**: Is the change covered by tests? Flag new logic without corresponding test cases. This dimension is **mandatory** for all logic changes.

#### Before Filing an Issue, Ask Internally:
1. Is this code actually broken or risky *right now*?
2. Could a reasonable developer disagree that this is an issue?

**Silent Rules (Do NOT Report):**
- Subjective stylistic preferences (tabs vs spaces) **unless they violate an explicit rule found in project config files.**
- Minor naming nitpicks that do not impair clarity.
- Issues that do not clearly meet the severity definitions above.

### 4. Provide Feedback

#### Output Constraints (Hard Limits)

To ensure the review is actionable and scannable:
- **CRITICAL**: List **ALL** findings. No upper limit.
- **WARNING**: List **up to 5** most severe findings. Prioritize by impact.
- **SUGGESTION**: List **up to 3** most valuable improvements.

If more issues exist, append a one-line note: *"(+X additional WARNINGs omitted for brevity. Ask if you want full list.)"*

#### Structure

**Summary**
2–3 sentences summarizing the change intent and overall health assessment. If no issues found, state this explicitly.

**Issues Found**
| Severity | Category | File:Line | Issue |
| :--- | :--- | :--- | :--- |
| CRITICAL | Security | `src/auth.ts:42` | SQL injection via raw query concatenation |
| WARNING | Error Handling | `utils/api.ts:15` | Missing `.catch` leads to unhandled rejection |
| SUGGESTION | Maintainability | `hooks/useData.ts:88` | Extract magic number `86400` to named constant |

*If no issues meet severity definitions:* `No issues meeting reporting thresholds found.`

**Detailed Findings**
For each issue listed:
- **File:** `path:line`
- **Category:** The review dimension (e.g., Security, Logic)
- **Problem:** Concise explanation of why this matters.
- **Suggestion:** Code block or clear instruction for resolution.

**Conclusion**
Select one: `APPROVE` | `APPROVE WITH SUGGESTIONS` | `NEEDS CHANGES`
*Format: Output the verdict on a new line after the detailed findings, e.g., `VERDICT: APPROVE WITH SUGGESTIONS`.*

### 5. Follow-up Interaction
If recommendation is **APPROVE WITH SUGGESTIONS** or **NEEDS CHANGES**:
- Offer to **Generate Fix Patches** (in unified diff format) or **Explain the Context** for deeper understanding.
- If the user declines follow-up, acknowledge and end the review session.

## Tone Guidance
- **CRITICAL / WARNING**: Direct, unambiguous, focused on impact. Be firm but not alarmist.
- **SUGGESTION**: Collaborative and constructive. Use phrasing like *"Consider extracting this to improve testability..."* rather than *"Don't do this."*
- **APPROVAL**: Acknowledge the value of the contribution specifically and positively.