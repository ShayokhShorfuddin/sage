"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/public/images/logo.svg";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const closeMenuButtonRef = useRef<HTMLButtonElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				closeMenuButtonRef.current &&
				!dropdownRef.current.contains(event.target as Node) &&
				!closeMenuButtonRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header>
			<nav className="flex justify-between items-center absolute w-full mt-5 px-[1rem] sm:px-[2rem]">
				<Link href="/">
					<Image src={Logo} alt="Sage Logo" className="w-28" />
				</Link>

				<ul className="hidden sm:flex text-neutral-400 text-sm border border-neutral-600 rounded-full p-2">
					<li>
						<Link
							href="/"
							className="px-3 py-2 hover:text-neutral-200 transition-colors duration-300"
						>
							Product
						</Link>
					</li>
					<li>
						<Link
							href="#pricing"
							className="px-3 py-2 hover:text-neutral-200 transition-colors duration-300"
						>
							Pricing
						</Link>
					</li>
					<li>
						<Link
							href="/"
							className="px-3 py-2 hover:text-neutral-200 transition-colors duration-300"
						>
							Blogs
						</Link>
					</li>
					<li>
						<Link
							href="/"
							className="px-3 py-2 hover:text-neutral-200 transition-colors duration-300"
						>
							About Us
						</Link>
					</li>
				</ul>

				<div className="flex items-center">
					<button
						type="button"
						className="px-3 py-1.5 hover:cursor-pointer bg-neutral-200 rounded-full text-sm"
					>
						Get Started
					</button>

					{isMenuOpen ? (
						<button
							type="button"
							className="hover:cursor-pointer sm:hidden py-2 pl-2"
							aria-label="Close menu"
							onClick={() => {
								setIsMenuOpen(false);
							}}
							ref={closeMenuButtonRef}
						>
							<X className="stroke-neutral-400" />
						</button>
					) : (
						<button
							type="button"
							className="hover:cursor-pointer sm:hidden py-2 pl-2"
							aria-label="Open menu"
							onClick={() => {
								setIsMenuOpen(true);
							}}
						>
							<Menu className="stroke-neutral-400" />
						</button>
					)}
				</div>

				{/* Mobile navigation dropdown */}
				<div
					className={`${isMenuOpen ? "block" : "hidden"} sm:hidden absolute top-12 right-0 mr-2 z-50`}
					ref={dropdownRef}
				>
					<div className="animate-in fade-in duration-240">
						<NavigationDropdown />
					</div>
				</div>
			</nav>
		</header>
	);
}

// Navigation dropdown for mobile devices
export function NavigationDropdown() {
	return (
		<div className="bg-neutral-900 border border-stone-700 rounded-xl px-4 py-3 w-min">
			<ul className="space-y-2.5 text-neutral-300">
				<li>
					<Link href="/">
						<p className="text-sm text-nowrap">Products</p>
					</Link>
				</li>
				<li>
					<Link href="#pricing">
						<p className="text-sm text-nowrap">Pricing</p>
					</Link>
				</li>
				<li>
					<Link href="/">
						<p className="text-sm text-nowrap">Blog</p>
					</Link>
				</li>
				<li>
					<Link href="/">
						<p className="text-sm text-nowrap">About Us</p>
					</Link>
				</li>
			</ul>
		</div>
	);
}
