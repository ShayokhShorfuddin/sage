"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQData: { question: string; answer: string }[] = [
	{
		question: "How secure is my data?",
		answer:
			"We take data security very seriously. All of your data is encrypted and stored securely. Yet, we recommend you to not share any sensitive information during interviews.",
	},

	{
		question: "Can I change my plan later?",
		answer:
			"Yes, you can change your plan at any time. You can change your plan by going to your account settings and clicking on the 'Change Plan' button.",
	},

	{
		question: "Is there any discount for students?",
		answer:
			"Yes, we offer a 20% discount for students. You can apply for the discount by sending us an email with your student ID.",
	},

	{
		question: "Will I get a job after using Sage?",
		answer:
			"We can't guarantee you a job, but we can guarantee you will learn a lot and become confident. We have a 92% success rate of our users getting a job after using Sage. At the end, it all depends on your effort and dedication.",
	},
];

export default function FAQ() {
	return (
		<section className="mt-[6rem] mx-[1rem] sm:mx-[2rem]">
			<p className="text-3xl text-neutral-300 font-semibold text-center">
				Frequently Asked Questions
			</p>

			<p className="text-neutral-400 mt-4 mx-auto text-center max-w-lg">
				These are the most commonly asked questions about Sage. Can't find what
				you're looking for? Feel free to ask our{" "}
				<Link href="/" className="underline underline-offset-3">
					community
				</Link>
				.
			</p>

			<Accordion.Root
				type="multiple"
				className="mt-[2rem] p-3 bg-neutral-900 rounded-xl border border-neutral-800 max-w-2xl mx-auto"
			>
				{FAQData.map((faq, index) => (
					<Accordion.Item
						key={faq.question}
						value={index.toString()}
						className={index === FAQData.length - 1 ? "" : "mb-2"}
					>
						<Accordion.Trigger className="group flex items-center justify-between text-neutral-400 w-full text-left hover:cursor-pointer">
							{faq.question}
							<ChevronDown
								className="transition-transform duration-300 group-data-[state=open]:rotate-180"
								aria-hidden
								size={17}
							/>
						</Accordion.Trigger>

						<Accordion.Content className="text-neutral-500 text-sm mt-2">
							{faq.answer}
						</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion.Root>
		</section>
	);
}
