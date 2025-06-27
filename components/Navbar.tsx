import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";

export default function Navbar() {
	return (
		<header>
			<nav className="flex justify-between items-center absolute w-full mt-5 px-8">
				<Link href="/">
					<Image src={Logo} alt="Sage Logo" className="w-28" />
				</Link>

				<ul className="flex text-neutral-400 text-sm border border-neutral-600 rounded-full p-2">
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
							href="/"
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

				<button
					type="button"
					className="px-3 py-1.5 hover:cursor-pointer bg-neutral-200 rounded-full text-sm"
				>
					Get Started
				</button>
			</nav>
		</header>
	);
}
