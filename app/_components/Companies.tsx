"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import Asana from "@/public/images/asana.svg";
import ChainLink from "@/public/images/chainlink.svg";
import Convex from "@/public/images/convex.svg";
import Dropbox from "@/public/images/dropbox.svg";
import Ghostty from "@/public/images/ghostty.svg";
import Godaddy from "@/public/images/godaddy.svg";
import Reflex from "@/public/images/reflex.svg";
import Sanity from "@/public/images/sanity.svg";
import Stripe from "@/public/images/stripe.svg";
import Voicemod from "@/public/images/voicemod.svg";

export default function Companies() {
	return (
		<div className="pt-[6rem]">
			<p className="text-center text-neutral-300 mx-[1rem]">
				Our active users landed jobs at these companies.
			</p>

			<Marquee
				autoFill
				speed={30}
				gradient
				gradientColor="#0a0a0a"
				className="mt-3"
			>
				<div className="flex items-center gap-12 py-4">
					<Image
						src={ChainLink}
						alt="ChainLink"
						height={32}
						className="ml-15"
					/>
					<Image src={Asana} alt="Asana" height={32} />
					<Image src={Convex} alt="Convex" height={32} />
					<Image src={Sanity} alt="Sanity" height={32} />
					<Image src={Dropbox} alt="Dropbox" height={32} />
					<Image src={Ghostty} alt="Ghostty" height={32} />
					<Image src={Stripe} alt="Stripe" height={32} />
					<Image src={Godaddy} alt="Godaddy" height={32} />
					<Image src={Voicemod} alt="Voicemod" height={32} />
					<Image src={Reflex} alt="Reflex" height={32} />
				</div>
			</Marquee>
		</div>
	);
}
