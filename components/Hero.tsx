import { Box, ChartSpline, UserSearch } from "lucide-react";
import Card from "./Card";
import Chip from "./Chip";

const cardsData: {
	icon: React.ReactNode;
	heading: string;
	description: string;
}[] = [
	{
		icon: <Box className="stroke-neutral-300" />,
		heading: "Immersive",
		description:
			"Experience realistic interview environments with a wide range of technical and behavioral questions.",
	},
	{
		icon: <UserSearch className="stroke-neutral-300" />,
		heading: "Deep Analysis",
		description:
			"Get detailed feedback and statistics on your performance, including strengths and areas for improvement.",
	},
	{
		icon: <ChartSpline className="stroke-neutral-300" />,
		heading: "Trace Progress",
		description:
			"Review and export past interview histories, track your growth, and refine your skills over time.",
	},
];

export default function Hero() {
	return (
		<section className="flex flex-col items-center min-h-svh pt-[7rem]">
			<Chip />

			<h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 inline-block bg-clip-text text-transparent mt-5 mx-[1rem]">
				Ace Your Next
				<br />
				Technical Interview
			</h1>

			<p className="mt-3 text-neutral-400 text-center mx-[1rem]">
				AI-powered mock interviews for practice and feedback.
				<br className="hidden xs:block" /> {""}
				Prepare smarter and gain confidence.
			</p>

			<div className="flex flex-col sm:flex-row gap-x-5 gap-y-3 mt-16 mx-[1rem]">
				{cardsData.map((cardData) => (
					<Card key={cardData.heading} {...cardData} />
				))}
			</div>
		</section>
	);
}
