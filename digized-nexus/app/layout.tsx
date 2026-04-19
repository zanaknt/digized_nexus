import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digized Nexus",
  description: "AI Agent and Incident Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="flex min-h-screen bg-[var(--shell-background)] text-[var(--shell-foreground)]">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header />
            <div className="min-h-0 flex-1 overflow-auto">{children}</div>
            <div className="border-t border-[var(--shell-border)] bg-[var(--shell-surface)] px-5 py-3">
              <div className="flex items-center justify-between text-xs text-[var(--shell-muted)]">
                <span className="font-medium uppercase tracking-[0.18em]">
                  Workspace Dock
                </span>
                <span>Reserved for terminal, logs, and output panels</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
