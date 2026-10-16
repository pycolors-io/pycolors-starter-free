import { THEME_INIT_SCRIPT } from "@/lib/theme";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const APP_NAME = "PyColors Starter Free";

const APP_DESCRIPTION =
  "A free Next.js interface starter with browser-local projects, an assistant playground and clear paths to Starter Pro.";

export const metadata: Metadata = {
  metadataBase: new URL("https://starter-demo.pycolors.io"),

  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },

  description: APP_DESCRIPTION,

  applicationName: APP_NAME,

  keywords: [
    "Next.js SaaS Starter",
    "PyColors",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "SaaS boilerplate",
    "Free UI starter",
  ],

  authors: [
    {
      name: "Patrice Parny",
      url: "https://pycolors.io",
    },
  ],

  creator: "PyColors",
  publisher: "PyColors",

  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    type: "website",
    url: "https://starter-demo.pycolors.io",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/twitter-image.png"],
    creator: "@pycolors",
  },

  robots: {
    index: false,
    follow: true,

    googleBot: {
      index: false,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://starter-demo.pycolors.io",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B10",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
