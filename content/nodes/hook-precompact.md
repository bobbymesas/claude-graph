---
short: Fires before context compaction — run cleanup or logging before /compact.
doc: https://code.claude.com/docs/en/hooks
docLabel: Hooks guide
---

PreCompact fires when Claude is about to compact the context window (either via `/compact`
or automatically when context is near its limit). It has no decision control — it's a
side-effects hook used for logging, cleanup, or external notifications before compaction
runs. Your hook receives `trigger` ("manual" or "auto") and `custom_instructions` on stdin.

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
# Log session state before compaction (side effects only)
echo "## Pre-Compact Log" >> .claude/compact-log.txt
echo "Trigger: $(jq -r '.trigger' 2>/dev/null)" >> .claude/compact-log.txt
echo "Files modified this session:" >> .claude/compact-log.txt
git diff --name-only 2>/dev/null | head -20 >> .claude/compact-log.txt
```
