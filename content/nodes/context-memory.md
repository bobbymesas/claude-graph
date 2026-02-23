---
short: Claude's working memory: the context window, CLAUDE.md, and auto-memory.
doc: https://code.claude.com/docs/en/memory
docLabel: Memory & context docs
---

Claude's context window (~200k tokens) holds everything it can see: your conversation, loaded file contents, tool results, CLAUDE.md, and the system prompt. Memory across sessions comes from CLAUDE.md (loaded fresh each time) and auto-memory files in the project memory directory.

### EXAMPLE: What lives in Claude's working memory
### FILE: Context window contents
### LANG: plaintext

```plaintext
┌─────────────────────────────────────────────────────┐
│  Context Window  (~200,000 tokens for Sonnet/Opus)  │
│                                                     │
│  System prompt              ~500–2,000 tokens       │
│  CLAUDE.md (loaded fresh)   variable                │
│  Conversation history       grows over time         │
│  File contents              (each Read adds tokens) │
│  Tool call results          (Bash output, searches) │
│  Auto-memory/MEMORY.md      first 200 lines         │
│                                                     │
└─────────────────────────────────────────────────────┘

Use /compact to summarize history and reclaim space.
```
