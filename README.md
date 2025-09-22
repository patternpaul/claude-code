# What I've learned using claude code. (v2-BETA)

The intent of this repo is to document what I've learned while using claude code. It will contain examples of the setup I am using. I will branch off every major version where I will run through my workflow for a small project to demo this setup in action.

# Big picture concepts

- There is a quote from Dharmesh Shah where he describes his approach to AI tools as `the smartest intern`, a person who is the smartest person in the world but has no context or understanding about your company/project and build your approach around that concept.
- `Clouds and Dirt`: Give claude code a very high level idea of the work at hand and how it probably wants to approach the project at a high level. Don't give it anything else. Also don't explain any of the code. Provide it tooling that will help guide it. Tests, linting tools etc. Think about all of the DevEx things you'd do to help onboard a new intern quickly and do those things.
- It acts like a human: You will get caught if you think about claude code like a machine or some sort of magical. All the things that would lead a human to success or failure will be exponentially more impactful.
- Context window matters: You should start off every bit of work in a cleared out context window. Claude code will attempt to compact the prior conversation and then use that compact in the next context window. This almost always leads it down the wrong path. Always work in small chucks and then clear out the context window. I go so far as to `/clear` then `/exit` and then boot up claude.
- Context window matters!!!!: Keep your descriptions short and precise. If possible, break up code into multiple files so that it doesn't need to eat up it's context window with unrelated code or context.
- Claude code will get stuck in a whole and then continue to dig. You will find it will get stuck and then start to try random things. THere is no saving it. Kill the running task, clear the context window and start again. I go so far as to revert the changes in that run.
- Use source control. Let Claude work in small incremental changes and commit those changes. This allows you to revert to a known good easily. Claude will write some crazy code and you will want to kill that instance and revert the insanity.
- Store a TODO list. Have a TODO list outside of claude's infrastructure. This allows you to have a work list that spans multiple session/context windows. It's also the KEY place for you to clearly lay out things it needs to do. Mark the next task as "next task" so it knows what to do next and it only works on that next task.
- Create a "project" directory for work. This will be where the TODO list will be stored and a README of the work to be done. Claude can also use it as a scratch location to store information between sessions.
- Prune any context like scratch data: it will start to store the craziest mix of information. Prune it down every so often to not eat up the context window.
- Use MCP servers for local tooling: MCP server tools will take priority over any instructions you give it. Typically those local tools will also be optimized for that specific activity. A few examples
  - Sequential thinking: helps claude break down work
  - server-filesystem: better interaction with files that don't blow out the context window
  - typescript-mcp
- Give Claude a first crack at everything: you'd be surprised at what it can achieve. At a bare minimum it will crank out all of the basic boilerplate etc way faster than you which is a net benefit.
- Use CLAUDE.md files. This will contain the typical instructions you'd always give claude code. Do not give it any context on the code as it will be out of date and then it will confuse claude. Just outline your expectations and give it indication on the tools and technologies and thats it.
- Use claude commands. You can create your own slash commands. This becomes very useful for repeated tasks like "write some tests" or "work on the NEXT TASK in the todo list". Typically you give it a set of instructions with that task and you don't want to have to re-type it every time.
- Use the claude settings file to mark certain commands as "always accept". claude will prompt you if it's ok to run some command. There are some commands you will always say yes. Add these to your claude code settings file.
- Store your claude code configs globally. You can store the commands, mcp server configs and claude code settings at the user level. This is beneficial as you will typically give it the same structured commands accross repos.
- Use claude to help you with claude.
  - Use claude to create and define the readme and todos for the project you want it to work on. This will get you to a "working" version, that is optimized for claude code to read much quicker that hand writting. You can create an initial readme and todo with a one liner and then get it to iterate on the setup. Stop when it seems like the changes are minor. Edit the files between runs.
  - Use claude to critique claude's work ( or anyone's work). It can quickly give you a detailed code review as a starting point.
  - Use claude to write the tests. Have a claude session write the tests and ONLY the tests for the next session to implement. If you have the same claude session write the tests and the implementation, typically it will support it's own crazy conclusions.
- Use trigger words. There are certain trigger words, like MUST, ALWAYS, NEVER, THINK (HARD/HARDER) etc that give it extra guidance
- Use Claude or other AIs to improve your CLAUDE.md, README.md and claude tasks. They can improve the information thats provided to remove any additional stuff that will only confuse claude.

# Details

Take a peak at

- The commands under .claude/commands. These are slash commands that get loaded when claude loads.
- .mcp.json for the MCP local tools config and setup
- .claude/settings.local.json for the local settings file that sets up the allowed MCP servers and commands.

# My current workflow

Note that I always `/clear` and `/exit` after every command to get a fresh context window. I won't mention this in the work flow.

- Create a new "project" under the projects directory. Add a minimal README.md and TODO.md. Basically 1~3 lines giving a high level description and 1 initial TODO task.
- Run `/plan-tasks PROJECT_NAME_HERE` multiple times to iterate on the plan. Review the git commit for that itteration. Edit the files if need be between iterations.
- Mark the first task as `(NEXT TASK)`
- Run the following loop
  - run `/create-tests PROJECT_NAME_HERE`
  - run `/commit-review PROJECT_NAME_HERE` to give me a quick review of the tests written. While claude is thinking, look at the commit
  - make any edits and commit the edits.
  - run `/next-task PROJECT_NAME_HERE`
  - run `/commit-review PROJECT_NAME_HERE` to give me a quick review of the tests written. While claude is thinking, look at the commit
  - make any edits and commit the edits.
  - Edit the TODO list if need be
  - Go back to the top

# CURRENT VERSION

Currently in BETA as I test out an updated approach breaking out explicit roles with claude coordinating more of the work between steps. You will note CLAUDE.md have explicit role definitions and the tasks explicitly call out to those roles. Initial testing of having claude do those roles without explicitly calling them out (writting tests in a separate session than writitng the code) has yielded promising results. The explicit call out to rolls is to further improve ensuring claude doesn't do more than it should. I can also break out the guidance in CLAUDE.md per role. I was having issues where CLAUDE.md explicitly tells it to do a TDD approach and then write the code which led to the "write test" task writting the actual implementation sometimes and the "write the code" task starting off with writing the tests.
