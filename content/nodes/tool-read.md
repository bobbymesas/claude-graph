---
short: Read files, find by pattern, search contents — core codebase tools.
doc: https://code.claude.com/docs/en/how-claude-code-works
docLabel: File tools reference
---

Read, Glob, and Grep form Claude's file system interface. Read loads specific files into context. Glob finds files by glob pattern (e.g. **/*.ts). Grep searches file contents with regex and returns matching lines. These are the most-used tools for understanding and navigating codebases.

### EXAMPLE: Codebase search patterns
### FILE: Common patterns
### LANG: plaintext

```plaintext
Read("src/auth/login.ts")      # load a specific file
Glob("src/**/*.test.ts")       # find all test files
Grep("useEffect", "*.tsx")     # find hook usage
Grep("TODO|FIXME", glob="**")  # find all TODOs

# Best practice: use Grep/Glob to find what you
# need before Read — avoids loading large files
# unnecessarily and saves context tokens.
```
