"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/public/images/icon.png";

export default function ForgotPassword() {
	return (
		<section className="flex flex-col items-center justify-center h-svh">
			<div className="flex flex-col items-center">
				<Image src={Icon} alt="icon" className="size-11" />

				<p className="text-2xl text-neutral-300 font-medium mt-1">
					Forgot your password?
				</p>

				<p className="text-neutral-500 text-sm">
					We just sent you a code to reset.
				</p>

				<form className="flex flex-col w-full gap-y-2 mt-5 text-sm">
					<PasswordField />

					<button
						type="submit"
						className="px-3 py-2 hover:cursor-pointer bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-200 font-medium transition-colors duration-150"
					>
						Reset password
					</button>
				</form>
			</div>
		</section>
	);
}

function PasswordField() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="w-full flex">
			<input
				type={showPassword ? "text" : "password"}
				placeholder="Enter secret code"
				className="px-4 py-2 rounded-l-lg border border-neutral-600 bg-neutral-800 text-neutral-200 placeholder-neutral-500 w-full"
			/>

			<button
				type="button"
				className="p-2 border border-l-0 border-neutral-600 bg-neutral-800 rounded-r-lg hover:cursor-pointer"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? (
					<EyeOff size={16} className="text-neutral-300" />
				) : (
					<Eye size={16} className="text-neutral-300" />
				)}

				{showPassword ? (
					<span className="sr-only">Hide password</span>
				) : (
					<span className="sr-only">Show password</span>
				)}
			</button>
		</div>
	);
}
