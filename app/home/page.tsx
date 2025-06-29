import Sidebar from "./components/Sidebar";

export default function Page() {
	return (
		<>
			<main className="flex">
				<Sidebar />
				<p className="text-neutral-300">Side content</p>
			</main>
		</>
	);
}
