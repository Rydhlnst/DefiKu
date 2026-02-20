# Defiku Project - AI Agent Guide

## Project Overview

This is a **Turborepo monorepo** starter template maintained by the Turborepo core team. It demonstrates a modern monorepo architecture with multiple Next.js applications sharing common UI components and configuration packages.

### Repository Structure

```
defiku/
├── apps/
│   ├── docs/          # Next.js documentation site (runs on port 3001)
│   └── web/           # Next.js main web application (runs on port 3000)
├── packages/
│   ├── ui/            # Shared React component library (@repo/ui)
│   ├── eslint-config/ # Shared ESLint configurations (@repo/eslint-config)
│   └── typescript-config/ # Shared TypeScript configurations (@repo/typescript-config)
├── package.json       # Root package.json with workspace scripts
├── pnpm-workspace.yaml # pnpm workspace configuration
└── turbo.json         # Turborepo task configuration
```

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Package Manager | pnpm | 9.0.0 |
| Build System | Turborepo | 2.8.10 |
| Framework | Next.js | 16.1.5 |
| UI Library | React | 19.2.0 |
| Language | TypeScript | 5.9.2 |
| Linting | ESLint | 9.x (flat config) |
| Formatting | Prettier | 3.7.4 |
| Styling | CSS Modules | Built-in |

## Build and Development Commands

All commands should be run from the repository root:

```bash
# Install dependencies
pnpm install

# Start development servers for all apps
pnpm run dev

# Build all apps and packages
pnpm run build

# Lint all packages
pnpm run lint

# Format code with Prettier
pnpm run format

# Run TypeScript type checking
pnpm run check-types
```

### Working with Specific Apps/Packages

Use Turborepo filters to work on specific packages:

```bash
# Start only the web app
pnpm exec turbo dev --filter=web

# Build only the docs app
pnpm exec turbo build --filter=docs

# Lint only the ui package
pnpm exec turbo lint --filter=@repo/ui
```

## Code Organization

### Apps (`/apps`)

Each app is a complete Next.js application with the App Router architecture:

- **`apps/web/`** - Main web application
  - Entry point: `app/page.tsx`
  - Layout: `app/layout.tsx`
  - Uses Geist font (local)
  - Runs on port 3000

- **`apps/docs/`** - Documentation site
  - Entry point: `app/page.tsx`
  - Layout: `app/layout.tsx`
  - Uses Geist font (local)
  - Runs on port 3001

Both apps share:
- Same project structure
- Same styling approach (CSS Modules)
- Same shared UI components from `@repo/ui`

### Packages (`/packages`)

#### `@repo/ui` - Shared UI Library

Location: `packages/ui/`

Exports components from `src/` directory:
- `button.tsx` - Button component with alert functionality
- `card.tsx` - Card component with link wrapper
- `code.tsx` - Code formatting component

Import pattern: `import { Button } from "@repo/ui/button"`

#### `@repo/eslint-config` - ESLint Configurations

Location: `packages/eslint-config/`

Provides three ESLint configurations:
- `base` - Base TypeScript configuration (turbo, prettier, typescript-eslint)
- `next-js` - Next.js specific config (base + React + Next.js rules)
- `react-internal` - React library config (base + React, for packages)

All configs use ESLint 9 flat config format.

#### `@repo/typescript-config` - TypeScript Configurations

Location: `packages/typescript-config/`

Provides shared tsconfig files:
- `base.json` - Base TypeScript configuration
- `nextjs.json` - Next.js specific configuration (extends base)
- `react-library.json` - React library configuration

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All strict TypeScript options are on
- **Module system**: NodeNext for packages, ESNext/Bundler for Next.js apps
- **Target**: ES2022
- **JSX**: Preserve (handled by Next.js)

### ESLint Configuration

All linting uses ESLint 9 with the new flat config format:

- Apps use `@repo/eslint-config/next-js`
- Packages use `@repo/eslint-config/react-internal` or `@repo/eslint-config/base`
- Rules are set to "warn" only (via `eslint-plugin-only-warn`)
- Ignored directories: `dist/`, `.next/`, `out/`, `build/`

### Import Conventions

- Use `import type` for type-only imports
- React components use named exports
- Package imports use the `@repo/` namespace for internal packages

### Component Structure

Components follow this pattern:

```tsx
"use client"; // For client components

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Component = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};
```

## Testing Instructions

**Note**: This repository does not currently include a testing framework. To add testing:

1. Install testing dependencies (Jest, Vitest, or Playwright)
2. Add test scripts to the root `package.json`
3. Create a `test` task in `turbo.json`
4. Add test files following the convention: `*.test.ts` or `*.spec.ts`

## Turborepo Configuration

The `turbo.json` defines the following task pipeline:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

Key behaviors:
- `build` depends on dependencies being built first
- `dev` tasks are not cached and run persistently
- Build outputs are cached in `.next/` directories

## Workspace Dependencies

Packages reference each other using pnpm workspaces:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"
  }
}
```

## Deployment

### Vercel (Recommended)

This repository is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Configure root directory for each app:
   - Web app: `apps/web`
   - Docs app: `apps/docs`
3. Build command: `cd ../.. && pnpm exec turbo run build --filter={app-name}`
4. Install command: `pnpm install`

### Remote Caching

Turborepo supports Vercel Remote Caching:

```bash
# Login to Vercel
turbo login

# Link your repository
turbo link
```

## Security Considerations

- Environment variables should be added to `.env` files (already ignored in `.gitignore`)
- No sensitive data should be committed to the repository
- ESLint `turbo/no-undeclared-env-vars` rule warns about undeclared environment variables

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `Card.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Configuration**: kebab-case (e.g., `eslint.config.js`)
- **Styles**: ComponentName.module.css (e.g., `page.module.css`)

## Key Files Reference

| File | Purpose |
|------|---------|
| `turbo.json` | Turborepo task pipeline and caching config |
| `pnpm-workspace.yaml` | Defines workspace package locations |
| `package.json` | Root dependencies and scripts |
| `apps/*/next.config.js` | Next.js configuration for each app |
| `apps/*/eslint.config.js` | ESLint configuration for each app |
| `packages/*/package.json` | Package metadata and exports |

## Getting Help

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
