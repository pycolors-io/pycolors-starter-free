interface GettingStartedStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly files?: readonly {
    readonly path: string;
    readonly purpose: string;
  }[];
  readonly note?: string;
  readonly links: readonly {
    readonly label: string;
    readonly href: string;
  }[];
}

// Informational content only. Following a link never records completion.
export const GETTING_STARTED_STEPS: readonly GettingStartedStep[] = [
  {
    id: "projects",
    title: "Try the project workflow",
    description:
      "Create a sample project, open its details, rename it or delete it. Changes stay in this browser and survive reloads when browser storage is available.",
    note: "Use sample data, not sensitive information. No shared database is connected.",
    links: [{ label: "Try projects", href: "/projects" }],
  },
  {
    id: "assistant",
    title: "Explore the assistant interface",
    description:
      "Try a chat response, review a local agent definition, or inspect a sample task plan inside the app.",
    note: "Local simulation only: no AI service is connected. This session clears when you leave the page or reload.",
    links: [
      { label: "Try the assistant", href: "/assistant" },
      {
        label: "Read the integration guide",
        href: "https://pycolors.io/docs/starter/assistant",
      },
    ],
  },
  {
    id: "customize",
    title: "Make the app yours",
    description: "In your own copy of the starter, begin with these files:",
    files: [
      { path: "app/layout.tsx", purpose: "App name and page metadata" },
      { path: "app/(app)/layout.tsx", purpose: "App header and branding" },
      { path: "app/globals.css", purpose: "Styles and semantic tokens" },
    ],
    links: [
      {
        label: "Read the project structure",
        href: "https://pycolors.io/docs/starter/project-structure",
      },
      {
        label: "Read the getting-started guide",
        href: "https://pycolors.io/docs/starter/getting-started",
      },
    ],
  },
  {
    id: "pro",
    title: "Evaluate connected foundations",
    description:
      "Compare Starter Pro for Auth.js authentication, protected routes, Prisma/PostgreSQL and Stripe billing foundations.",
    note: "Pro is separate source code to configure and adapt. Buying it does not unlock this demo or automatically migrate your local projects.",
    links: [
      {
        label: "Explore Starter Pro",
        href: "https://pycolors.io/starters/pro",
      },
      {
        label: "See what Pro includes",
        href: "https://pycolors.io/docs/starter-pro/what-is-included",
      },
    ],
  },
];
