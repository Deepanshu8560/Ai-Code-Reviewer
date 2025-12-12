import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Code Reviewer - Intelligent Code Analysis",
  description: "AI-powered code review tool that analyzes React, JavaScript, and CSS for best practices, performance, accessibility, and security issues.",
  keywords: ["code review", "AI", "static analysis", "React", "JavaScript", "TypeScript", "CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
