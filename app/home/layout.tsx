import type React from "react";
import Sidebar from "./_components/Sidebar";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen" suppressHydrationWarning>
      <Sidebar />
      {children}
    </main>
  );
}
