import Image, { type StaticImageData } from "next/image";
import Alice from "@/public/images/alice.png";
import Milton from "@/public/images/milton.png";

type InterviewerProps = {
	image: StaticImageData;
	name: string;
	designation: string;
	text: string;
};

const interviewersData: InterviewerProps[] = [
	{
		image: Milton,
		name: "Milton Anderson",
		designation: "Senior Frontend Lead",
		text: "Milton is a passionate frontend leader with a strong background in building scalable web applications and mentoring engineering teams.",
	},
	{
		image: Alice,
		name: "Alice Bennett",
		designation: "Senior Frontend Engineer",
		text: "Alice has over 8 years of experience in software development and is known for her expertise in frontend systems.",
	},
];

export default function InterviewerSelection() {
	return (
		<section className="px-5 pb-[2rem] w-full">
			<h1 className="text-neutral-400 text-3xl md:text-4xl lg:text-5xl font-medium text-center mt-[3rem] lg:mt-[5rem]">
				Meet the interviewers
			</h1>

			<p className="text-neutral-500 text-center mt-2 font-medium text-md md:text-lg">
				Who would you prefer to conduct your interview?
			</p>

			<div className="flex flex-col xs:flex-row gap-3 max-w-lg mx-auto mt-[2rem]">
				{interviewersData.map((interviewer) => (
					<InterviewerCard key={interviewer.name} {...interviewer} />
				))}
			</div>
		</section>
	);
}

function InterviewerCard({ image, name, designation, text }: InterviewerProps) {
	return (
		<div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer">
			<Image src={image} alt="Article image" />

			<div className="p-3">
				<p className="text-neutral-400 text-lg font-medium leading-snug">
					{name}
				</p>
				<p className="text-neutral-600 font-medium">{designation}</p>
				<p className="text-neutral-500 text-sm mt-2">{text}</p>
			</div>
		</div>
	);
}
