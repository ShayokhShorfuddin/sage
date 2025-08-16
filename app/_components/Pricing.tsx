import { CheckCheck } from "lucide-react";

type PricingCardProps = {
	title: string;
	price: string;
	subtitle: string;
	features: string[];
	isPopular?: boolean;
};

const pricingData: PricingCardProps[] = [
	{
		title: "Basic",
		price: "Free",
		subtitle: "Ideal for exploring the platform.",
		features: [
			"Access to all basic features.",
			"Basic analytics and reporting.",
			"Upto 5 AI interviews.",
			"1 Large Language Model (LLM)",
		],
	},
	{
		title: "Pro",
		price: "$10",
		subtitle: "For those who dream big.",
		features: [
			"Advanced analytics and reporting.",
			"Unlimited AI interviews.",
			"Upto 2 interviewers at once.",
			"3 Large Language Models (LLM).",
		],
		isPopular: true,
	},
	{
		title: "Expert",
		price: "$30",
		subtitle: "Perfect for ambitious developers.",
		features: [
			"Exclusive study materials.",
			"Unlimited AI interviews.",
			"Upto 4 interviewers at once.",
			"5 Large Language Models (LLM).",
		],
	},
];

export default function Pricing() {
	return (
		// biome-ignore lint/nursery/useUniqueElementIds: <>
		<section className="mt-[6rem] mx-[1rem] sm:mx-[2rem]" id="pricing">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				{pricingData.map((item) => (
					<PriceCard key={item.title} {...item} />
				))}
			</div>
		</section>
	);
}

function PriceCard({
	title,
	price,
	subtitle,
	features,
	isPopular,
}: PricingCardProps) {
	return (
		<div className="p-5 bg-neutral-900 rounded-xl border border-neutral-800">
			<div className="flex justify-between items-center">
				<p className="text-neutral-400 font-medium">{title} Plan</p>
				{isPopular && (
					<p className="text-neutral-400 text-xs py-1 px-2 bg-neutral-800 rounded-full">
						Popular
					</p>
				)}
			</div>
			<p className="text-neutral-300 text-4xl font-bold mt-2">
				{price}
				{price === "Free" ? null : (
					<span className="text-sm text-neutral-600"> / month</span>
				)}
			</p>

			<p className="text-neutral-400 mt-4 text-sm">{subtitle}</p>

			<button
				type="button"
				className="hover:cursor-pointer mt-5 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 text-neutral-300 font-semibold py-2 px-4 rounded-lg w-full"
			>
				Get Started
			</button>

			<div className="h-[0.5px] w-full bg-neutral-800 mt-[2rem]" />

			<div className="flex flex-col gap-y-2 mt-5">
				{features.map((feature) => (
					<div key={feature} className="flex items-center gap-x-2">
						<CheckCheck className="stroke-neutral-600" />
						<p className="text-sm text-neutral-500">{feature}</p>
					</div>
				))}
			</div>
		</div>
	);
}
