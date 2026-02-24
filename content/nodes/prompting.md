---
short: How to write prompts that get great results from Claude Code.
doc: https://code.claude.com/docs/en/
docLabel: Claude Code docs
---

The single biggest leverage point in a Claude Code session is the quality of your initial prompt. Claude works best when you provide task + context + constraints + success criteria — all in one shot. A vague prompt forces Claude to guess. A specific prompt lets Claude execute.

**Anatomy of a good prompt:**
- **Task**: what you want done (verb + object)
- **Context**: what Claude can't see (architecture, conventions, related files)
- **Constraints**: scope limits, style rules, files to avoid touching
- **Success criteria**: how you'll know it's done

Give Claude what it can't see: your team's naming conventions, which files are frozen, what the failing test actually does, which abstraction to use. The more relevant context you front-load, the fewer correction loops you'll need.

Use `/plan` before complex tasks — it forces Claude to propose before implementing, which surfaces misunderstandings cheaply.

### EXAMPLE: Vague vs. specific prompt
### FILE: terminal prompt
### LANG: plaintext

```
❌ Vague
> Fix the login

✅ Specific
> The login form in src/auth/Login.tsx submits but silently fails
  when the email contains a plus sign. The API returns 400 (check
  the network tab). Fix the email validation regex — don't change
  the form layout or the submit handler's function signature.
  Done when: plus-sign emails submit successfully and the error
  message shows for truly invalid emails.
```
### NOTE: The specific prompt names the file, the symptom, a reproduction signal (network tab/400), a constraint (don't change X), and a success condition. Each of those cuts a whole correction loop.

### EXAMPLE: Start with intent, then refine
### FILE: terminal session
### LANG: plaintext

```
# Step 1: state intent clearly
> Add dark mode support to the settings page

# Step 2: ask Claude to propose first
> /plan

# Step 3: redirect if the plan is wrong
> Actually, use CSS custom properties stored in :root — not a
  separate stylesheet. Keep all changes inside styles.css only.

# Step 4: approve and let it build
> Looks good, go ahead
```
### NOTE: `/plan` is the highest-leverage habit — it forces Claude to surface assumptions before writing a line of code. Redirect in Step 3 is cheap; redirecting after 200 lines of generated code is not.

### EXAMPLE: Give Claude what it can't see
### FILE: .claude/CLAUDE.md (excerpt)
### LANG: markdown

```markdown
## Architecture conventions
- Server state via React Query — never add useState for API data
- Auth via AuthContext — never bypass with direct API calls
- All DB queries go through src/db/index.ts — no raw SQL in components

## Off-limits files
- src/legacy/ — frozen, do not modify
- Any file under vendor/

## Definition of done
- Feature works, tests pass, no TypeScript errors
- New code follows existing naming patterns in the same file
```
### NOTE: This excerpt lives in CLAUDE.md so it applies to every session automatically. Architecture conventions prevent the most common mistakes; off-limits files prevent accidental breakage of frozen code.
