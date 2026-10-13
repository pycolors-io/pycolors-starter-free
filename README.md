![license](https://img.shields.io/github/license/pycolors-io/pycolors-starter-free)
![next](https://img.shields.io/badge/Next.js-15.x-black)
![tailwind](https://img.shields.io/badge/TailwindCSS-v4-06B6D4)
![version](https://img.shields.io/github/v/release/pycolors-io/pycolors-starter-free)
![discussions](https://img.shields.io/github/discussions/pycolors-io/pycolors-starter-free)

# PyColors Starter (Free)

Free SaaS starter for Next.js powered by the PyColors ecosystem.\
Clone → run → ship your first product screens in minutes.

👉 Starter page: https://pycolors.io/starters/free \
👉 Documentation: https://pycolors.io/docs/starter \
👉 UI library: https://pycolors.io/ui \
👉 Discussions: https://github.com/pycolors-io/pycolors-starter-free/discussions

---

## Why this exists

Most starters are either:

- Too empty → you still build everything
- Too complex → you spend days deleting code

PyColors Starter Free sits in the middle.

It gives you a clean frontend baseline so you can focus on building
your product instead of reinventing the foundation.

---

## What you get

### App foundation

- Next.js App Router setup
- Production-ready folder structure
- Dashboard shell + demo auth screens
- Clean layout architecture ready to scale

### Design system included

- PyColors UI pre-integrated
- Tailwind v4 + semantic design tokens
- Accessible Radix-based components
- Copy/paste components → ship screens fast

### Developer experience

- TypeScript strict config
- ESLint baseline
- `pnpm verify` quality checks
- Opinionated conventions that scale

---

## Quick start

```bash
pnpm install
pnpm dev
```

Open: http://localhost:3000

Start building your product.

---

## Included screens

This starter already contains real product surfaces:

- Demo authentication screens (login / register / reset)
- Dashboard layout
- Projects module (table + dialogs)
- Settings / Billing / Admin pages structure

It's intentionally minimal but realistic.

---

## Tokens setup

```css
/* app/globals.css */
@import "@pycolors/tokens/tokens.css";
```

This keeps marketing, docs, templates and apps visually consistent.

---

## Who this starter is for

Perfect if you are:

- Building a SaaS
- Prototyping a startup idea
- Creating internal tools
- Starting a new product from scratch

Not meant to be a full SaaS — \
meant to be the fastest starting point.

---

## The ecosystem

| Layer        | Purpose                |
| ------------ | ---------------------- |
| PyColors UI  | UI primitives          |
| Tokens       | Design language        |
| Starter Free | App foundation         |
| Starter Pro  | Full SaaS architecture |
| Templates    | Ready-to-sell products |

---

## Local project demo

Open `/projects` to create a project, open its details, rename it, or delete it.
Projects are stored in this browser's `localStorage` and survive page reloads.
Use **Reset demo** to restore the sample projects after confirming the reset.

This is a frontend demo: no account, shared database, authorization, or
cross-device synchronization is connected. Use sample data, not sensitive
information. Clearing browser storage removes your changes. If storage is
unavailable, the app keeps changes for the current visit and displays a notice.
Project status, member counts, and update labels are illustrative demo values.

## When to choose Starter Pro

Use Free to explore the UI and prototype your product workflows. Choose Pro
when you need the connected foundations behind those screens:

- Auth.js authentication and protected routes.
- Prisma with PostgreSQL for your application's data layer.
- Stripe Checkout, customer portal, and webhook-driven billing foundations.
- Transactional email and PWA foundations.

Starter Pro is source code to configure and adapt for your product. Purchasing
it does not unlock this running demo or automatically migrate its local projects.
You still implement your own project data model and workflows.

[Explore Starter Pro](https://pycolors.io/starters/pro) ·
[See what is included](https://pycolors.io/docs/starter-pro/what-is-included) ·
[Plan your upgrade](https://pycolors.io/docs/starter/upgrade)

---

## Community

Have a question, idea, or feedback?

• Ask questions → https://github.com/pycolors-io/pycolors-starter-free/discussions
• Report bugs → https://github.com/pycolors-io/pycolors-starter-free/issues

Discussions are the best place to get help with setup, integrations,
and deployment.

---

## Read-only mirror

This repository is automatically synced from the PyColors monorepo.\
Source of truth: `apps/starter-free`.

You can open Issues and participate in Discussions in this repository.

---

## License

MIT
