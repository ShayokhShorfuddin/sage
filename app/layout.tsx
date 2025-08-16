import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
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
		<html lang="en" className="dark">
			<body className={`${geistSans.className} antialiased`}>{children}</body>
		</html>
	);
}
