---
name: code-reviewer
description: "Reviews code for correctness, maintainability, and project standards. Invoke when user asks for code review or before merging changes."
---

# Code Reviewer

This skill guides the agent in conducting professional and thorough code reviews for local development changes.

## Workflow

### 1. Identify Changes
*   Check status: `git status`
*   Read diffs: `git diff` (working tree) and/or `git diff --staged` (staged).
- **If no changes are detected**: Inform the user "No local changes found to review." and stop.
- **If changes are extensive**: Focus on core logic files first; group findings by module and output in batches rather than reviewing every line equally.

### 2. In-Depth Analysis
> Read surrounding code context for modified files to understand intent. Check project config files to align with the project's own style and rules.

Analyze the code changes based on the following pillars:

*   **Correctness**: Does the code achieve its stated purpose without bugs or logical errors?
*   **Maintainability**: Is the code clean, well-structured, and easy to understand and modify in the future? Consider factors like code clarity, modularity, and adherence to established design patterns.
*   **Readability**: Is the code well-commented (where necessary) and consistently formatted according to our project's coding style guidelines?
*   **Efficiency**: Are there any obvious performance bottlenecks or resource inefficiencies introduced by the changes?
*   **Security**: Are there any potential security vulnerabilities or insecure coding practices?
*   **Edge Cases and Error Handling**: Does the code appropriately handle edge cases and potential errors?
*   **Testability** (optional): Is the new or modified code adequately covered by tests (even if existing tests pass)? Suggest additional test cases that would improve coverage or robustness.

### 3. Provide Feedback

#### Structure
*   **Summary**: A high-level overview of the review.
*   **Findings**:
     *   **Critical**: Bugs, security issues, or breaking changes. Must include file path and line number (e.g., `src/utils/auth.ts:L42`), and provide fix code.
     *   **Improvements**: Suggestions for better code quality or performance. Include file path and line number; fix code is optional.
     *   **Nitpicks**: Formatting or minor style issues (optional).
*   **Conclusion**: Clear recommendation (Approved / Request Changes). If no findings, state "No issues found" in Summary and give Approved.

#### Tone
*   Be constructive, professional, and friendly.
*   Explain *why* a change is requested, not just *what* is wrong.
*   Avoid condescending language; frame suggestions as opportunities, not failures.
*   For approvals, acknowledge the specific value of the contribution.
