import Companies from "@/components/Companies";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Page() {
	return (
		<>
			<Navbar />

			<main>
				<Hero />
				<Companies />
				<Footer />
			</main>

			{/* TODO: Ensure responsiveness */}
			{/* TODO: Add developer success story */}
		</>
	);
}
