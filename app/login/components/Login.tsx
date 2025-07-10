import Image from "next/image";
import Link from "next/link";
import Google from "@/public/images/google.svg";
import Icon from "@/public/images/icon.png";

export default function Login() {
	return (
		<section className="flex flex-col items-center justify-center h-svh">
			<div className="flex flex-col items-center">
				<Image src={Icon} alt="icon" className="size-11" />

				<p className="text-2xl text-neutral-300 font-medium mt-1">
					Log into your account
				</p>

				<button
					type="button"
					className="flex gap-x-3 justify-center items-center text-nowrap w-full bg-neutral-200 text-neutral-800 font-medium mt-6 py-2 rounded-sm hover:cursor-pointer"
				>
					<Image src={Google} alt="icon" className="size-5" />
					<span className="text-sm">Continue with Google</span>
				</button>

				<div className="flex items-center gap-x-3 w-full mt-2">
					<div className="h-[0.5px] w-full bg-neutral-800" />
					<p className="text-neutral-500 text-sm text-nowrap">or use email</p>
					<div className="h-[0.5px] w-full bg-neutral-800" />
				</div>

				<form className="flex flex-col w-full gap-y-2 mt-2 text-sm">
					<input
						type="email"
						placeholder="john@example.com"
						className="px-4 py-2 rounded-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500"
					/>
					<input
						type="password"
						placeholder="Enter your password"
						className="px-4 py-2 rounded-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500"
					/>
					<button
						type="submit"
						className="px-3 py-2 hover:cursor-pointer bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-200 font-medium transition-colors duration-150"
					>
						Sign in
					</button>
				</form>

				<p className="text-neutral-500 text-sm text-nowrap mt-5">
					Don't have an account?{" "}
					<Link href="/register" className="text-neutral-300 underline">
						Sign up
					</Link>
				</p>
				<Link
					href="/forgot-password"
					className="text-neutral-500 text-sm text-nowrap mt-1 underline"
				>
					Forgot my password
				</Link>
			</div>
		</section>
	);
}
