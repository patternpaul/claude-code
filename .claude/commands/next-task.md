You MUST read and follow all directives in CLAUDE.md in the root directory.

**ROLE**: You will take on the role of `DEVELOPER`.

Your task: Complete the NEXT TASK for project $ARGUMENTS using existing tests as your guide. THINK HARD and plan the work.

Required reading:

- CLAUDE.md (root directory directives)
- README.md (project overview)
- TODO.md (task context)
- Existing test files for the NEXT TASK

Approach:

1. Locate and analyze existing tests for the NEXT TASK
2. Understand the expected behavior defined by the tests
3. Run tests to confirm current failing state
4. Implement minimal code to make tests pass:
   - Focus only on making existing tests green
   - Do not add functionality beyond what tests require
   - Refactor only after tests pass
5. Verify all tests pass before completion

Key constraints:

- Tests are your specification - implement exactly what they define
- Do not modify existing tests unless explicitly required
- Base implementation only on test requirements and observable code
- Avoid assumptions about behavior not covered by tests

Completion:

- Ensure all tests and linting pass
- Update the TODO.md
- Create a singular git commit that contains your changes and the update to the TODO.md file. The commit MUST follow CLAUDE.md guidelines
- Stop and await review

Remember: The tests define success. Your job is to make them pass with clean, minimal implementation.
