export default function CTA() {
	return (
		<section className="mt-[6rem] mx-[1rem] sm:mx-[2rem]">
			<p className="text-center text-3xl md:text-4xl font-semibold">
				Ready to land your{" "}
				<span className="relative after:content-[''] after:w-full after:h-[30px] after:left-0 after:bottom-[-20px] after:z-10 after:absolute after:bg-center after:bg-no-repeat after:bg-cover after:bg-[url('../public/images/line.svg')]">
					dream
				</span>{" "}
				job?
			</p>
			<p className="mx-auto max-w-sm text-center text-neutral-400 mt-4">
				Join 1 million developers worldwide and prepare smarter with Sage.
			</p>

			<form className="mt-[2rem] flex flex-col sm:flex-row gap-3 justify-center">
				<input
					type="email"
					placeholder="Enter your email"
					className="px-4 py-2 rounded-lg border border-neutral-600 bg-neutral-800 placeholder-neutral-500"
				/>
				<button
					type="submit"
					className="px-3 py-2 hover:cursor-pointer bg-neutral-200 text-neutral-950 rounded-lg text-sm"
				>
					Get Started
				</button>
			</form>
		</section>
	);
}
