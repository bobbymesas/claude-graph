---
short: Spawn a subagent with isolated context to handle a parallel subtask.
doc: https://code.claude.com/docs/en/sub-agents
docLabel: Task tool & subagents docs
---

The Task tool spawns a child agent with its own isolated context window, agentic loop, and tool set. Subagents work independently and return results to the parent when done. Enables genuine parallelism: spawn a code reviewer, QA agent, and researcher simultaneously. Note: each subagent uses roughly 7× more tokens than sequential work.

### EXAMPLE: Task tool cost/benefit guide
### FILE: When to use Task
### LANG: plaintext

```plaintext
USE Task tool when:
  ✓ Work is truly independent and parallelizable
  ✓ You need to protect parent context from growing
  ✓ Specialists (reviewer, QA, researcher) add value

AVOID Task tool when:
  ✗ Work is sequential (each step needs previous)
  ✗ Task is simple (overhead isn't worth it)
  ✗ Budget is tight (~7× more tokens than sequential)

Sweet spot: 3 parallel specialist agents on complex
multi-facet tasks (review + test + document).
```
