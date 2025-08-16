import Companies from "./_components/Companies";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Pricing from "./_components/Pricing";
import Testimony from "./_components/Testimony";

export default function Page() {
	return (
		<>
			<Navbar />
			<main>
				<Hero/>
				<Companies/>
				<Testimony/>
				<Pricing/>
			</main>
		</>
	);
}
