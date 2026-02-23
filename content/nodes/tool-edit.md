---
short: Modify and create files — the core file-editing primitives.
doc: https://code.claude.com/docs/en/how-claude-code-works
docLabel: File tools reference
---

Edit performs surgical string replacement inside existing files — it finds exact text and
replaces it, requiring a prior Read so the match is accurate. Write creates or fully
overwrites a file. Together they cover every file-modification workflow. Claude always
prefers Edit over Write when the file already exists, to avoid overwriting unrelated content.

### EXAMPLE: Edit an existing file
### FILE: Example pattern
### LANG: plaintext

```plaintext
# 1. Read the file first (required before Edit)
Read("src/auth.ts")

# 2. Surgical replacement — old_string must be unique in the file
Edit(
  file_path = "src/auth.ts",
  old_string = "const timeout = 30",
  new_string = "const timeout = 60"
)
```

### EXAMPLE: Write — create a new config file
### FILE: .eslintrc.json
### LANG: json

```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "error"
  }
}
```
