# Pitchforkle - Claude Development Guidelines

## Workflow

### 1. Planning Phase

- Read the codebase to understand relevant files and architecture
- Create a detailed plan in `tasks/todo.md` with checkboxes
- **STOP and get human approval before proceeding**

### 2. Execution Phase

- Work through todo items systematically, checking them off as complete
- After completing each major task, provide a concise update
- Mark completion in todo.md as you go

### 3. Review Phase

- Add a review section to todo.md summarizing:
- What changed and why
- Any important decisions made
- Potential impacts or follow-up needed
- **Update roadmap.md**: Move completed features to "✅ Current Features", update "🚧 In Progress" status

## Core Principles

### Simplicity First

Every change should be surgical and minimal - impact only code directly relevant to the task. Smaller changes = fewer bugs. Avoid complex refactors unless absolutely necessary.

### Root Cause, Not Bandaids

Always investigate and fix the underlying problem. No temporary patches or workarounds that defer the real issue.

### Follow Existing Patterns

- Match the project's established code style, naming conventions, and architecture
- Don't introduce new patterns or paradigms without discussion
- When in doubt, ask rather than guess

### Ask Questions

If requirements are unclear or multiple implementation approaches exist, ask before coding. Preventing rework is worth the interruption.

## Best Practices

### Code Quality

- **Consistency**: Follow existing conventions religiously
- **Comments**: Add them for complex logic, update them when changing code
- **Error Handling**: Implement proper error boundaries and user-friendly messages
- **No Debug Artifacts**: Remove console.logs, commented code, and temp files

### Testing

- Manually verify all changes work as expected
- Test in the browser with `npm run dev` running
- For non-trivial changes, consider if tests need updating
- Document how you tested in the review section

### Web Standards

- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Lazy loading, code splitting, optimize images
- **Security**: Input validation, XSS prevention
- **SEO**: Proper meta tags, structured data (important for daily game discoverability)

### Dependencies

- Check if existing packages can solve the problem before adding new ones
- Verify maintenance status and bundle size impact
- Document why new dependencies were added

### Documentation

- **Always update README.md when making feature changes**
- When adding new features, document them
- When updating game mechanics, update the "How to Play" section
- Keep README in sync with actual functionality
- Note any breaking changes or migration steps needed

## Git Workflow

**You do not make commits directly.** Instead:

After completing work, ask:

```
Ready to commit? Suggested message: <one-line what and why>
```

Wait for confirmation before committing.

## Project-Specific Notes

### Tech Stack

- **React + TypeScript** - Functional components, proper typing
- **Vite** - Fast refresh, optimized builds
- **shadcn/ui** - Components copied into codebase, fully customizable
- **Tailwind CSS** - Utility-first styling with CSS variables

### Project Setup

- **Dependencies are already installed** - `node_modules` present
- No need to run `npm install` unless package.json changes
- **Dev server** - Always remind user to run `npm run dev` in separate terminal
- **Adding shadcn components** - User runs: `npx shadcn@latest add <component>`
- **Path aliases** - Use `@/` prefix (e.g., `import { Button } from "@/components/ui/button"`)

### React + Vite Best Practices

- Use functional components with proper TypeScript typing
- Proper dependency arrays in useEffect
- Lazy loading for route-based code splitting
- Leverage Vite's fast HMR - don't fight it
- shadcn components: extend via composition, don't modify source

### Styling Architecture

**⚠️ Update this section if layout/styling configuration changes**

**Primary Styling Location:**
- **`src/styles.css`** - Main CSS file containing:
  - Global CSS variables (colors, spacing, radii)
  - Tailwind theme configuration via `@theme inline`
  - Base styles for all elements

**CSS Variables** (defined in `:root`):
- `--brand-black`: rgb(26, 26, 26)
- `--success-green`: rgb(34, 197, 94)
- `--background`: #ffffff
- `--foreground`: rgb(26, 26, 26)
- `--border`: rgb(204, 204, 204)
- `--ring`: rgb(26, 26, 26)
- `--radius`: 0.625rem

**Component Styling Locations:**
- **shadcn/ui components** in `src/components/ui/`:
  - `button.tsx` - Button variants and styles
  - `badge.tsx` - Badge component styles
  - `input.tsx` - Input field styles
  - Styled using Tailwind utilities + CSS variables

- **Custom game components** in `src/components/`:
  - `AlbumCover.tsx`, `GuessInput.tsx`, `FeedbackDisplay.tsx`, etc.
  - Styled with inline Tailwind classes

**Styling Workflow:**
1. Define colors/spacing as CSS variables in `src/styles.css`
2. Use Tailwind utilities that reference those variables
3. For new shadcn components: user runs `npx shadcn@latest add <component>`

### Game Context

Pitchforkle is a daily music game where players guess Pitchfork ratings from album covers alone.

## When Things Go Wrong

- If stuck for >10 minutes, stop and ask for guidance
- If you realize a mistake, immediately flag it and propose a fix
- If the original plan won't work, explain why and propose alternatives
- Always preserve working state before attempting risky changes

## Handling Scope Changes

- If new requirements emerge mid-task, flag them and ask if we should:
  - Add to current plan
  - Defer to separate task
  - Abandon current approach
- Don't silently expand scope - always confirm first

---

**Remember**: Simplicity, thoroughness, and communication are your priorities. When in doubt, ask.
