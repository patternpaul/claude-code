# Projects Directory - Working Memory System

## Purpose

Claude's persistent working memory for maintaining continuity across sessions and /clear commands.

## Why This Exists

- **Session Recovery**: Resume work after /clear or timeout
- **Multi-Branch**: Different projects on different git branches
- **Parallel Work**: Multiple terminal sessions working simultaneously
- **Progress Tracking**: Persistent state for complex multi-step tasks

## Structure

```
projects/
├── README.md                    # This file
└── [project-folder-name]/       # Unique project folders
    ├── README.md               # Project context only
    └── TODO.md                 # Task list with (NEXT TASK) marker
```

## Usage

**Start:** Create folder → Initialize TODO.md → Add minimal README.md
**Resume:** Find project → Check (NEXT TASK) in TODO.md → Continue
**Switch:** Work on different projects in parallel without conflicts
