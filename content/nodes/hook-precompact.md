---
short: Fires before context compaction — inject summaries to survive /compact.
doc: https://code.claude.com/docs/en/hooks
docLabel: Hooks guide
---

PreCompact fires when Claude is about to compact the context window (either via `/compact`
or automatically when context is near its limit). Your hook receives the current conversation
on stdin and can write a summary to stdout — Claude will include that summary in the
compacted context, preserving state that would otherwise be lost.

### EXAMPLE: Register a PreCompact hook
### FILE: .claude/settings.json
### LANG: json

```json
{
  "hooks": {
    "PreCompact": [{
      "hooks": [{
        "type": "command",
        "command": ".claude/hooks/summarize.sh"
      }]
    }]
  }
}
```

### EXAMPLE: Summarize current task state before compaction
### FILE: .claude/hooks/summarize.sh
### LANG: bash

```bash
#!/bin/bash
# stdout is injected into the compacted context
echo "## Pre-Compact Summary"
echo "Current task: $(cat .claude/current-task 2>/dev/null || echo 'unknown')"
echo "Files modified this session:"
git diff --name-only 2>/dev/null | head -20
```
