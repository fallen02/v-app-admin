import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import BaseLayout from "./baseLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "AniHost",
  description: "AniHost",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
                "min-h-screen bg-background font-roboto antialiased",
                roboto.variable,
              )}
      >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <BaseLayout>
              {children}
        </BaseLayout>
        <Toaster />
      </ThemeProvider >
      </body>
    </html>
  );
}
