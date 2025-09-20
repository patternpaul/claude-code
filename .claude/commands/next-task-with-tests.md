You MUST read and follow all directives in CLAUDE.md in the root directory.

Your task: Complete the NEXT TASK for project $ARGUMENTS using TDD with the SIMPLEST possible implementation.

Required reading:

- CLAUDE.md (root directory directives)
- README.md (project overview)
- TODO.md (task context)

TDD Approach with simplicity focus:

1. Analyze the NEXT TASK requirements thoroughly
2. Write failing tests that define the MINIMAL required behavior
3. Implement the SIMPLEST code to make tests pass:
   - Choose the most obvious, direct solution
   - Avoid premature optimization or complex patterns
   - Use standard library functions over custom implementations
   - Write explicit, clear code over clever solutions
4. Refactor only for clarity, not sophistication
5. Base all decisions on observable evidence, not assumptions

Implementation principles:

- Red-Green-Refactor cycle with simplicity at each step
- Tests should verify basic functionality, not edge cases initially
- Implement only what tests require - nothing more
- Prefer straightforward solutions that are easy to understand and debug

Documentation requirements:

- Only document what you can directly observe in the code
- Avoid speculative or assumed behavior
- Ground all explanations in concrete evidence

Completion:

- Ensure all tests and linting pass
- Update TODO.md (mark current task complete, note any follow-up items)
- Create a singular git commit containing all changes following CLAUDE.md guidelines
- Stop and await review

Remember: Simple TDD means basic tests driving minimal implementations. Complexity can be added later if actually needed.
