"use client";

export default function NotFound() {
	return (
		<section className="h-svh flex flex-col justify-center items-center">
			<p className="text-4xl text-neutral-300 font-semibold ">404</p>

			<h1 className="text-neutral-400 text-sm mt-2">
				Could not find requested resource.
			</h1>

			<button
				type="button"
				className="text-sm font-semibold p-2 bg-neutral-800 text-neutral-300 rounded-md mt-4 hover:cursor-pointer"
				onClick={() => window.history.back()}
			>
				Go back
			</button>
		</section>
	);
}
