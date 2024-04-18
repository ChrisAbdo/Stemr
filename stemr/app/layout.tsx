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
