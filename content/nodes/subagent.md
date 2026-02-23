---
short: A child agent Claude autonomously spawns to handle a subtask in parallel.
doc: https://code.claude.com/docs/en/sub-agents
docLabel: Subagents docs
---

When Claude uses the Task tool, it spawns a subagent with its own isolated context window and loop. Subagents work concurrently and report back to the parent — enabling parallel workstreams. Note: spawning subagents is expensive (~7× more tokens than a linear approach), so it's most valuable for tasks that genuinely benefit from parallelism or isolation. The three most useful subagents: Code Reviewer, Researcher, and QA.

### EXAMPLE: Running 3 subagents simultaneously
### FILE: Parallelization pattern
### LANG: plaintext

```plaintext
# Claude spawns all three at once via Task tool:

  ┌─ Subagent 1: Code Reviewer ─────────────────┐
  │  tools: Read, Grep, Glob                    │
  │  → returns: severity-grouped findings       │
  └─────────────────────────────────────────────┘

  ┌─ Subagent 2: QA ────────────────────────────┐
  │  tools: Bash, Read                          │
  │  → returns: test run results & failures     │
  └─────────────────────────────────────────────┘

  ┌─ Subagent 3: Researcher ────────────────────┐
  │  tools: WebSearch, WebFetch                 │
  │  → returns: relevant docs & examples        │
  └─────────────────────────────────────────────┘

Parent agent aggregates all results and responds.
Cost: ~7× more tokens than sequential — use wisely.
```

### EXAMPLE: Example: QA subagent
### FILE: .claude/agents/qa.md
### LANG: markdown

```markdown
---
name: qa
description: Runs tests, checks for regressions, and validates
  that changes work as expected. Use after code changes.
tools: Bash, Read, Glob
model: claude-sonnet-4-6
maxTurns: 25
---

You are a QA engineer. For each task:

1. Run the full test suite: `npm test`
2. Run linting: `npm run lint`
3. Check for type errors: `npm run typecheck`
4. Report any failures with file and line references
5. Suggest fixes for each failure

Never mark a task done if tests are failing.
```
