![license](https://img.shields.io/github/license/pycolors-io/pycolors-starter-free)
![next](https://img.shields.io/badge/Next.js-15.x-black)
![tailwind](https://img.shields.io/badge/TailwindCSS-v4-06B6D4)
![version](https://img.shields.io/github/v/release/pycolors-io/pycolors-starter-free)
![discussions](https://img.shields.io/github/discussions/pycolors-io/pycolors-starter-free)

# PyColors Starter (Free)

Free SaaS starter for Next.js powered by the PyColors ecosystem.\
Clone → run → ship your first product screens in minutes.

👉 Starter page: https://pycolors.io/starters/free \
👉 Documentation: https://pycolors.io/docs/saas-starter \
👉 UI library: https://pycolors.io/ui \
👉 Discussions: https://github.com/pycolors-io/pycolors-starter-free/discussions

------------------------------------------------------------------------

## Why this exists

Most starters are either:

-   Too empty → you still build everything
-   Too complex → you spend days deleting code

PyColors Starter Free sits in the middle.

It gives you a clean production baseline so you can focus on building
your product instead of reinventing the foundation.

------------------------------------------------------------------------

## What you get

### App foundation

-   Next.js App Router setup
-   Production-ready folder structure
-   Dashboard shell + auth flows
-   Clean layout architecture ready to scale

### Design system included

-   PyColors UI pre-integrated
-   Tailwind v4 + semantic design tokens
-   Accessible Radix-based components
-   Copy/paste components → ship screens fast

### Developer experience

-   TypeScript strict config
-   ESLint baseline
-   `pnpm verify` quality checks
-   Opinionated conventions that scale

------------------------------------------------------------------------

## Quick start

``` bash
pnpm install
pnpm dev
```

Open: http://localhost:3000

Start building your product.

------------------------------------------------------------------------

## Included screens

This starter already contains real product surfaces:

-   Authentication flows (login / register / reset)
-   Dashboard layout
-   Projects module (table + dialogs)
-   Settings / Billing / Admin pages structure

It's intentionally minimal but realistic.

------------------------------------------------------------------------

## Tokens setup

``` css
/* app/globals.css */
@import "@pycolors/tokens/tokens.css";
```

This keeps marketing, docs, templates and apps visually consistent.

------------------------------------------------------------------------

## Who this starter is for

Perfect if you are:

-   Building a SaaS
-   Prototyping a startup idea
-   Creating internal tools
-   Starting a new product from scratch

Not meant to be a full SaaS — \
meant to be the fastest starting point.

------------------------------------------------------------------------

## The ecosystem

| Layer        | Purpose                 |
| ------------ | ----------------------- |
| PyColors UI  | UI primitives           |
| Tokens       | Design language         |
| Starter Free | App foundation          |
| Starter Pro  | Full SaaS architecture  |
| Templates    | Ready-to-sell products  |

------------------------------------------------------------------------

## Starter Pro (next)

Starter Free gives you the full SaaS surface.

Starter Pro keeps the same screens and UX contracts —
but wires the foundations for production so you can ship the **money path** faster.

From sign up → onboarding → subscription → team management.

---

### What you get with Pro

- **Authentication + organizations architecture**
  Sessions, teams, invites, and role-based access patterns — production-ready.

- **Stripe billing foundations**
  Checkout + customer portal flows, subscription states, and billing UX wired end-to-end.

- **Production data layer conventions**
  Structured CRUD patterns, validation, loading/error states, and API contracts aligned with real backend wiring.

- **Advanced dashboard patterns**
  Onboarding cues, empty states, scalable layouts, and real product UX decisions baked in.

- **Less glue code. Fewer edge cases.**
  Opinionated defaults and automation so you focus on product — not wiring.

---

Designed for founders and product engineers shipping their first paid version.

👉 Early access & roadmap: https://pycolors.io/starters

------------------------------------------------------------------------

## Community

Have a question, idea, or feedback?

• Ask questions → https://github.com/pycolors-io/pycolors-starter-free/discussions
• Report bugs → https://github.com/pycolors-io/pycolors-starter-free/issues

Discussions are the best place to get help with setup, integrations,
and deployment.

------------------------------------------------------------------------

## Read-only mirror

This repository is automatically synced from the PyColors monorepo.\
Source of truth: `apps/starter-free`.

You can open Issues and participate in Discussions in this repository.

------------------------------------------------------------------------

## License

MIT
