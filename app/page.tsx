import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Page() {
	return (
		<>
			<Navbar />

			<main>
				<Hero />
				<div className="h-screen"></div>
			</main>
		</>
	);
}
