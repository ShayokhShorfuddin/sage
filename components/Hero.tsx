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
			"Get detailed feedback and statistic on your performance, including strengths and areas for improvement.",
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
		<section className="flex flex-col items-center min-h-svh pt-[8rem]">
			<Chip />

			<h1 className="text-center font-bold text-6xl leading-tight bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 inline-block bg-clip-text text-transparent mt-5">
				Ace Your Next
				<br />
				Technical Interview
			</h1>

			<p className="mt-3 text-neutral-400 text-center">
				AI-powered mock interviews for practice and feedback.
				<br />
				Prepare smarter and gain confidence.
			</p>

			<div className="flex gap-x-5 mt-20">
				{cardsData.map((cardData) => (
					<Card key={cardData.heading} {...cardData} />
				))}
			</div>
		</section>
	);
}
