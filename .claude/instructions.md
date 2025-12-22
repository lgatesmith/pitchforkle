# Pitchforkle - Claude Instructions

## Project Setup

- **Dependencies are already installed** - `node_modules` is present and up to date
- No need to run `npm install` unless package.json changes
- **Dev server** - Always remind the user to run `npm run dev` in a separate terminal tab if they want to test the app
- **shadcn/ui is configured** - Use `npx shadcn@latest add <component>` to add components (user runs this)
- **Path aliases** - Use `@/` prefix for imports (e.g., `import { Button } from "@/components/ui/button"`)

## Architectural Guidelines

When making any architectural decisions for this project, always consider:

- **React best practices** - Component composition, hooks usage, state management
- **Vite best practices** - Fast refresh, build optimization, module structure
- **Modern React patterns** - Use functional components, proper hook dependencies, avoid unnecessary re-renders
- **TypeScript integration** - Leverage strong typing for better DX and fewer runtime errors
- **Vite-specific optimizations** - Lazy loading, code splitting, asset handling
- **shadcn/ui patterns** - Components are copied into the codebase and fully customizable
- **Tailwind CSS** - Utility-first styling with CSS variables for theming

## Documentation Practices

**Always update the README when making feature changes:**
- When adding new features, update the README.md to document them
- When updating existing features (like game mechanics), update the "How to Play" section
- Keep the README in sync with the actual functionality of the app
- Document any changes to game rules, scoring, or user interaction

## Git Commit Guidelines

**Never commit code proactively:**
- After making changes, ask the user if they are ready to commit
- Provide a brief, concise 1-line commit message suggestion
- Wait for user confirmation before committing

## Project Overview

Pitchforkle is a daily music game where players guess Pitchfork ratings from album covers alone.
