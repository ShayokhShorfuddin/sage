import Companies from "@/components/Companies";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Testimony from "@/components/Testimony";

export default function Page() {
	return (
		<>
			<Navbar />

			<main>
				<Hero />
				<Companies />
				<Testimony />
				<Pricing />
				<Footer />
			</main>

			{/* TODO: Ensure responsiveness */}
			{/* TODO: Add developer success story */}
		</>
	);
}
