import type React from "react";
import Sidebar from "./_components/Sidebar";
import "@/app/globals.css";
import SidebarSessionWrapper from "./SidebarSessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen" suppressHydrationWarning>
      <SidebarSessionWrapper>
        <Sidebar />
      </SidebarSessionWrapper>
      {children}
    </main>
  );
}
