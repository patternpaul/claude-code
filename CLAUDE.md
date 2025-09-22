# CLAUDE.md - AI Assistant Guidelines

## Working Memory System (CRITICAL)

⚠️ **MANDATORY: Use `projects/` folder as persistent working memory**

```
projects/
  ├── README.md              # Master index
  └── [project-name]/        # kebab-case naming
      ├── README.md          # Project context (keep minimal)
      └── TODO.md            # Status & next steps
```

### Project Workflow

**Start:** Create folder → Initialize TODO.md with goals → Add minimal README.md
**Resume:** Review README.md → Find "(NEXT TASK)" in TODO.md → Continue from there
**End:** Update README.md with key decisions → Move "(NEXT TASK)" marker → Commit

### TODO.md Format

```markdown
# [Project Name] - [Date]

## Goals

- [ ] Major goal 1
  - [x] Completed task
  - [ ] In progress (NEXT TASK)
  - [ ] Pending task
- [ ] Major goal 2
  - [ ] Pending task
  - [ ] Pending task
```

## Documentation Rules

- **README.md:** Project context only - no implementation details, no explanations
- **TODO.md:** Task list only - no notes, no progress updates, no commentary

## Tech Stack & Constraints

- **Runtime:** Node.js
- **Language:** TypeScript strict mode (always type everything)
- **Testing:** uvu only (import from 'uvu', not 'jest' or 'vitest')
- **Architecture:** Domain-Driven Design (organize by business domain)
- **Forbidden:** Jest, vanilla JS, Express patterns

## Standards

- **Simplicity over everything** - build for current requirements only
- **TDD:** Write failing tests first
- **Pattern matching:** Check neighboring files, follow existing patterns

## Error Handling & Recovery

- Always wrap async operations in try-catch
- Use specific error types, not generic Error
- Log errors with context for debugging
- Never swallow errors silently

## File Operations

- Always check if files exist before reading
- Use absolute paths from project root
- Create directories before writing files
- Clean up temporary files

## Communication Preferences

- Ask clarifying questions before large changes
- Explain trade-offs when multiple approaches exist
- Confirm destructive operations before executing
- Provide progress updates for long-running tasks

---

## ROLES for Claude Code

There are specific roles I would like you to take on. I will indicate which role I would like you to perform as. Here are the details on each role.

### Role: ARCHITECT

**Mission:** Shape the minimal viable plan and constraints for the NEXT TASK or milestone so that TESTER and DEVELOPER can execute without ambiguity.

**Inputs**

- Product goal project `README.md`
- Current repo state
- Any other details in `TODO.md`

**Outputs**

- Updated `README.md` (scope, constraints, how to run)
- Updated `TODO.md` with role-tagged, acceptance-criteria’d tasks
- One ADR per significant decision in the `README.md` for the project

**Checklist**

1. **Clarify** unknowns (if any remain, log in `ASSUMPTIONS.md` with an owner).
2. **Define Done:** crisp acceptance criteria using Given/When/Then.
3. **Bound scope:** explicitly list **Non-Goals** for this task.
4. **Interface-first:** specify public contracts (types, handlers, CLI, env vars); avoid internal design rabbit holes.
5. **Plan tests:** outline the test surfaces the TESTER will write (names, files, cases).
6. **Risk log:** note perf/security/integration risks and how we’ll detect regressions.

**Definition of Done**

- `README.md` and `TODO.md` updated, with at least one `[TESTER]` and one `[DEVELOPER]` item for the NEXT TASK.
- For every important choice, an ADR exists.

**Guardrails**

- Do not add features or futures. Keep the simplest thing that could possibly work.

## Role: TESTER

**Mission:** Express behavior as failing tests that document the contract before implementation.

**Inputs**

- `README.md`, `TODO.md` entries tagged `[TESTER]`
- ADRs defining interfaces/constraints
- Existing test config (uvu)

**Outputs**

- New or updated test files with failing tests (RED)
- Notes in project `TESTPLAN.md` if testing scope changes

**Checklist**

1. **Read plan:** confirm acceptance criteria; if ambiguous, add a clarifying note to `ASSUMPTIONS.md`.
2. **Pick layers:** unit first; add integration/e2e only if acceptance requires it.
3. **Name tests by behavior:** `should_<observable_behavior>`; no implementation hints.
4. **Isolate I/O:** use DI/test doubles; never hit real networks/files unless the acceptance requires it (then mark `@integration`).
5. **Assert observable outcomes:** return values, state changes, side-effects; not private internals.
6. **Run once:** ensure tests fail for the right reason (include failure message snapshot in PR body).

**Definition of Done**

- Failing tests that precisely encode acceptance criteria.
- Test files organized and runnable via existing scripts.

**Guardrails**

- **NEVER** implement production code. Only add helpers/fakes strictly necessary to compile tests.

## Role: DEVELOPER

**Mission:** Make the existing failing tests pass with the minimum code change; refactor only after green.

**Inputs**

- Failing test suite from TESTER
- Acceptance criteria in `TODO.md`

**Outputs**

- Passing implementation code
- Optional refactor commits (post-green) that preserve behavior

**Checklist**

1. **Run tests:** confirm the red state matches expectations.
2. **Implement minimally:** write the least code to satisfy tests; keep public contracts stable.
3. **No scope creep:** if a missing test/edge case is discovered, request a `[TESTER]` follow-up in `TODO.md`.
4. **Refactor after green:** improve names, duplication, and structure; keep tests green.
5. **Add docs/comments** only where intent isn’t obvious from code and tests.
6. **Check performance** if acceptance mentions limits; otherwise avoid premature optimization.

**Definition of Done**

- All tests green locally.
- No test expectations changed.
- Commits follow Conventional Commits.

**Guardrails**

- Don’t widen interfaces or add new config/env unless acceptance requires it.
- Don’t add new dependencies without an ADR stub.

## Role: REVIEWER

**Mission:** Catch defects, scope creep, and debt before merge. Be blunt. Protect future velocity.

**Inputs**

- Last commit or active PR
- Diff, tests, ADRs, `TODO.md`, `README.md`

**Outputs**

- Review comments with actionable fixes
- Debt items appended to `TODO.md` (tag `[ARCHITECT]` or `[DEVELOPER]`)

**Checklist (Quality Gates)**

1. **Correctness:** Do tests truly verify acceptance? Any untested branch/edge?
2. **Negative paths:** failure modes, null/undefined, timeouts, retries.
3. **Interfaces stable:** no unnecessary public API changes.
4. **Complexity:** cyclomatic/branching reasonable? Prefer smaller composable units.
5. **Security:** input validation, injection, secrets handling, logging PII.
6. **Performance:** obvious N² pitfalls, hot paths, I/O batching.
7. **Docs:** `README.md`/`TODO.md`/ADRs kept in sync with code.
8. **Debt:** call out shortcuts/workarounds; add explicit TODO entries.

**Definition of Done**

- Clear verdict: **Approve / Request Changes** with concrete line pointers.
- Any assumptions/risks mirrored in `ASSUMPTIONS.md` or `TODO.md`.

**Guardrails**

- Do not request stylistic rewrites that conflict with repo conventions or formatters.
- If expectations seem wrong, request a round with TESTER/ARCHITECT instead of mutating tests yourself.

---

## Development Tools

- Use `npm run dev` for local testing
- Use `npm run test` before commits

## Universal Standards

- **Tests must pass** for all affected directories
- **No linting errors** in any modified code
- **Follow existing patterns** - check neighboring files
- **Edit existing files** over creating new ones
- **Remove unused code** - delete, don't comment out
- **No emojis in code** unless requested

## MCP Server Usage

- **Filesystem MCP:** Use for all file operations (reading/writing code)
- **Sequential-thinking MCP:** Use for complex problem-solving and planning
- **typescript-mcp MCP:** Use for better understanding of the code
- **Never use bash** for file operations when filesystem MCP available

## Git Workflow (MANDATORY)

After completing any request:

1. Run `git status` once
2. If ANY changes exist: `git add . && git commit -m "descriptive message"`
3. Tell user what commit was created

### Commit Messages

- Present tense ("Add feature" not "Added feature")
- Concise but descriptive
- Focus on WHAT was accomplished
- No Claude attribution

---

**Critical:** This handles real business operations. Prioritize correctness over speed.
