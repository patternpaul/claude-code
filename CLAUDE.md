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

- **Runtime:** Node.js Firebase Functions (use `functions.` APIs)
- **Language:** TypeScript strict mode (always type everything)
- **Testing:** uvu only (import from 'uvu', not 'jest' or 'vitest')
- **Architecture:** Domain-Driven Design (organize by business domain)
- **Forbidden:** Jest, vanilla JS, Express patterns

## Standards

- **Simplicity over everything** - build for current requirements only
- **TDD:** Write failing tests first
- **Pattern matching:** Check neighboring files, follow existing patterns
- **Validation:** `npm run pre-deploy` MUST PASS before work complete

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

## Development Tools

- Use `npm run dev` for local testing
- Use `npm run lint:fix` before commits
- Database migrations via `npm run migrate`
- Deploy only via `npm run deploy:prod`

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
