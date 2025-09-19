import type React from 'react';
import Sidebar from './_components/Sidebar';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="grid grid-cols-[max-content_1fr] h-svh overflow-hidden"
      suppressHydrationWarning
    >
      <Sidebar />

      <main className="overflow-y-auto">{children}</main>
    </div>
  );
}
