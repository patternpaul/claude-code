YOU MUST read and follow all directives in the CLAUDE.md in the root directory. We are going to work in the functions directory. YOU MUST read and follow all directives in the CLAUDE.md in the functions directory. You will be reviewing changes in relation to project $ARGUMENTS.

Review the work that you (Claude) made to this codebase using LOCAL git commands and review of the files. Start from commit 85d656bb30eac470a999c3587bc6ed4dbf6ef546.

MUST use these exact local git commands to analyze your work:

- `git log -1 --oneline` - to see the commit message
- `git show --stat` - to see files changed with stats
- `git show` - to see the full diff of your changes
- `git diff HEAD~1 HEAD` - alternative way to see the diff

DO NOT use `gh` or any GitHub CLI commands. DO NOT look at pull requests. ONLY use local git repository commands.

1. **Summary of Changes**: What did you modify, add, or delete?

2. **Quality Assessment**: Rate the overall quality of your changes and explain your reasoning.

3. **Potential Issues**: Identify any concerns, edge cases, or areas that might need attention.

4. **Code Style & Best Practices**: Did you follow established patterns in the codebase? Any deviations and why?

5. **Testing Considerations**: What should be tested? Any potential breaking changes?

6. **Documentation Impact**: Do any docs need updating based on your changes?

MUST requirements:

- Be brutally honest about the quality - don't sugarcoat weaknesses
- MUST highlight any rushed decisions or areas where you weren't fully confident
- MUST identify any technical debt introduced
- MUST flag if you made assumptions about requirements that should be verified
- MUST note any dependencies or side effects of your changes
- If you used any workarounds or temporary solutions, MUST call them out explicitly

Format your response as a concise but thorough code review that a senior developer would give.

Then you MUST update TODO.md with your suggestions and then create a commit based on my guidelines. I will then review your work.
