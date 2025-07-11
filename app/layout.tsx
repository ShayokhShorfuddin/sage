import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sage - AI Powered Technical Interview Preparation Platform",
	description:
		"Sage is an AI-powered technical interview preparation platform designed to help developers ace their technical interviews and land their dream job.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-neutral-950">
			<body className={`${geistSans.variable} antialiased`}>{children}</body>
		</html>
	);
}
