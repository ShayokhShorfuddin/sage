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
      className="grid grid-cols-[210px_1fr] h-screen overflow-hidden"
      suppressHydrationWarning
    >
      {/* TODO: To apply expanded state to the sidebar, we might need to create a seperate client component and use that inside this layout file */}
      <SidebarSessionWrapper>
        <Sidebar />
      </SidebarSessionWrapper>

      <main className="overflow-y-auto">{children}</main>
    </div>
  );
}
