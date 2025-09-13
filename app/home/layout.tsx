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
    <div
      className="grid grid-cols-[max-content_1fr] h-screen overflow-hidden"
      suppressHydrationWarning
    >
      <SidebarSessionWrapper>
        <Sidebar />
      </SidebarSessionWrapper>

      <main className="overflow-y-auto">{children}</main>
    </div>
  );
}
