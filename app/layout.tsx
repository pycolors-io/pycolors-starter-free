import type { Metadata, Viewport } from 'next';

import './globals.css';

const APP_NAME = 'PyColors Starter Free';
const APP_DESCRIPTION =
  'Production-ready SaaS foundation for modern Next.js applications.';

export const metadata: Metadata = {
  metadataBase: new URL('https://starter-demo.pycolors.io'),

  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },

  description: APP_DESCRIPTION,

  applicationName: APP_NAME,

  keywords: [
    'Next.js SaaS Starter',
    'PyColors',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'SaaS boilerplate',
    'Production-ready starter',
  ],

  authors: [
    {
      name: 'Patrice Parny',
      url: 'https://pycolors.io',
    },
  ],

  creator: 'PyColors',
  publisher: 'PyColors',

  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  openGraph: {
    type: 'website',
    url: 'https://starter-demo.pycolors.io',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ['/twitter-image.png'],
    creator: '@pycolors',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B10',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
