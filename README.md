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

## Light and dark appearance

Use the sun/moon button in the public or application header to switch between
light and dark mode. The Free authentication screens also include this control.
On first visit, appearance follows your system preference. An explicit choice
is saved in this browser for this starter, takes precedence over the system,
and is restored before rendering on reload. Other open tabs of the same starter
receive the saved choice.

The preference is local to the browser and origin, not your account. If browser
storage is blocked, switching still works on the current page, but the choice
may not survive a reload. Clearing storage restores the system default on the
next visit. Both modes use the existing PyColors semantic tokens.

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
- Free assistant playground (local chat, definition export and sample task states)
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

## Dashboard getting-started guide

Start at `/dashboard` for four informational steps before the illustrative
metrics:

1. **Try the project workflow.** Open `/projects` to create a sample project,
   view its details, rename it or delete it. Changes stay in this browser when
   storage is available; use sample data rather than sensitive information.
2. **Explore the assistant interface.** [Try the assistant](/assistant) and follow
   the [integration guide](https://pycolors.io/docs/starter/assistant). Replies
   are local simulations; no model is connected and the session is not saved.
3. **Make the app yours.** Edit `app/layout.tsx` for metadata,
   `app/(app)/layout.tsx` for app-header branding, and `app/globals.css` for styles
   and tokens. Follow the [project structure](https://pycolors.io/docs/starter/project-structure)
   and [getting-started guide](https://pycolors.io/docs/starter/getting-started).
4. **Evaluate connected foundations.** [Explore Starter Pro](https://pycolors.io/starters/pro)
   and [see what is included](https://pycolors.io/docs/starter-pro/what-is-included)
   for Auth.js, protected routes, Prisma/PostgreSQL and Stripe billing foundations.

The guide does not track completion or save onboarding progress. Following a
link does not complete a step. Pro remains separate source code to configure:
purchasing it does not unlock the running Free demo or migrate local projects.
The existing project workflow, theme preference and illustrative-data notice
remain unchanged.

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

## Assistant playground

Open `/assistant` from desktop/mobile navigation or the dashboard guide. Choose
one suggestion, then Send. Try Stop/Retry, a local agent definition and its JSON
export, a non-sensitive text-file reference, and explicit Work simulation states.
The UI is included in Free. Replies and task results are fixed examples; no model,
provider account or paid request is required. Nothing runs in the background.

Messages, drafts and references last only while the page is mounted. New chat,
navigation away or reload clears the session. No prompt/file data is added to
analytics. Read the delivered [consumer README](components/assistant/README.md)
and https://pycolors.io/docs/starter/assistant for limits and backend integration.
Pro does not automatically connect a model, unlock this demo or migrate its data.

## Product demo and Starter Pro

All routes share an app-owned neutral light/dark theme. Public PyColors token
files remain unchanged. The workspace includes a skip link, responsive
navigation, local project CRUD and the existing assistant playground.

Login, registration and password recovery are local interface previews. Use
made-up details: submitting validates the form, clears the fields and shows an
explicit demo result. Credentials are not sent or stored, no account or session
is created, and no recovery email is sent. The forms stay disabled until their
local JavaScript is ready, including when JavaScript is unavailable. Settings
remain read-only; team changes last only while that page is open. Billing uses fictional sample prices
and invoices, not the Starter Pro purchase price.

Pro cards explain the separate source-code foundations and link to
https://pycolors.io/starters/pro and
https://pycolors.io/docs/starter-pro/what-is-included. Buying Pro does not unlock
this demo or migrate local projects. Expand the illustrative interface only
when you want to inspect its sample layout.

### Browser regression (canonical monorepo)

From the monorepo root, after building Starter Free and installing the existing
UI Playwright browser (`pnpm --filter @pycolors/ui test:storybook:install`):

```sh
pnpm --filter @pycolors/starter-free exec next start --hostname 127.0.0.1 -p 3113
# In another terminal:
node apps/starter-free/tests/browser/product-demo.mjs
```

This optional local check uses the public UI workspace's existing Playwright
dev dependency. It checks all routes in light/dark at 390/1440px, local account
form validation and the no-JavaScript guard, project persistence/rename/delete,
assistant sample replies/reset, mobile navigation and absence of application
mutation requests. Screenshots and results are written to a printed
temporary directory. It does not run against production or in the standalone
Starter Free mirror.

## Standalone installation and Vercel

The public mirror installs published `@pycolors/ui` and `@pycolors/tokens`
versions from npm. It does not require the monorepo or private packages.
The app-level `pnpm-lock.yaml` locks this standalone dependency graph; the
monorepo continues to use its root lockfile and workspace overrides.

Use Node 24 and the pnpm version declared in `packageManager`:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm verify
```

The included `vercel.json` selects pnpm with a frozen lockfile, then runs the
Next.js build. The standalone repository is the project root. No environment
variables are required for the demo. When dependency metadata changes, refresh
and validate this lockfile in a clean copy outside the monorepo, then commit it
in the canonical `apps/starter-free` source before the next subtree sync.

Inside the canonical monorepo, the root pnpm overrides resolve UI and tokens
locally. The root Turbo configuration explicitly builds `@pycolors/ui` before
Starter Free typechecking or builds: the public dependency ranges used by this
standalone app do not create Turbo workspace edges under pnpm's default linking
policy. Preserve these task dependencies when updating the mirror metadata.
