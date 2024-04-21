import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { TailwindIndicator } from "@/components/tailwind-indicator";

export const metadata: Metadata = {
  title: "Stemmer",
  description: "Your music, deconstructed.",
  openGraph: {
    title: "Stemmer",
    description: "Your music, deconstructed.",
  },
  twitter: {
    title: "Stemmer",
    description: "Your music, deconstructed.",
    card: "summary_large_image",
    creator: "@chrisjabdo",
  },
  metadataBase: new URL("https://stemr.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <TailwindIndicator />

          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
