![license](https://img.shields.io/github/license/pycolors-io/pycolors-starter-free)
![next](https://img.shields.io/badge/Next.js-15.x-black)
![tailwind](https://img.shields.io/badge/TailwindCSS-v4-06B6D4)

# PyColors Starter (Free)

A **production-ready Next.js starter** to ship SaaS faster --- with a
clean baseline:\
**PyColors UI + Tokens**, opinionated structure, and DX conventions.

👉 Docs & ecosystem: https://pycolors.io \
👉 UI repo: https://github.com/pycolors-io/pycolors-ui \
👉 Tokens repo: https://github.com/pycolors-io/pycolors-tokens

------------------------------------------------------------------------

## ⚠️ Read-only mirror

This repository is automatically synced from the **PyColors monorepo**.\
**Source of truth:** `apps/starter-free`

You can open **Issues and Discussions here** --- code changes are synced
from the monorepo.

------------------------------------------------------------------------

## What you get (Free)

-   Next.js (App Router) baseline
-   Tailwind v4 + tokens-driven theming
-   PyColors UI integrated (copy components, ship screens)
-   A clean structure you can extend (auth-ready, data-ready)
-   Lint + TypeScript checks (`pnpm verify`)

------------------------------------------------------------------------

## Quick start

``` bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

------------------------------------------------------------------------

## Tokens setup

This starter uses PyColors tokens:

``` css
/* app/globals.css */
@import "@pycolors/tokens/tokens.css";
```

------------------------------------------------------------------------

## Who this is for

-   Indie hackers shipping SaaS
-   Teams that want a clean "starter-grade" UI baseline
-   Developers who want consistency (UI + Tokens + TS + ESLint)

------------------------------------------------------------------------

## What's coming in Starter Pro

Starter Free is the foundation.\
Starter Pro will focus on the "money path":

-   Auth + teams + billing-ready architecture
-   Full dashboard layout + key product screens
-   CRUD patterns + data table presets
-   More automation, more conventions, less decisions

Early access → https://pycolors.io/starters

------------------------------------------------------------------------

## License

MIT
