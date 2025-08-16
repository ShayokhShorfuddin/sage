import Companies from "./_components/Companies";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Page() {
	return (
		<>
			<Navbar />
			<main>
				<Hero/>
				<Companies/>
			</main>
		</>
	);
}
