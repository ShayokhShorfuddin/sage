import Image from "next/image";
import Dropbox from "@/public/images/dropbox.svg";
import Poppy from "@/public/images/Poppy_Nicholls.jpg";

export default function Testimony() {
	return (
		<section className="flex flex-col sm:flex-row gap-x-10 gap-y-10 justify-between mx-[1rem] sm:mx-[2rem] mt-[6rem]">
			{/* Logo, text and person */}
			<div>
				<Image src={Dropbox} alt="Logo" className="w-36" />

				<p className="text-xl text-neutral-400 leading-normal max-w-[30rem] mt-7">
					The best interview preparation platform I've ever used. It helped me
					greatly to refresh my skills and prepare for the interview process.
				</p>

				<div className="flex gap-x-3 mt-7">
					<Image
						src={Poppy}
						alt="Poppy Nicholls"
						className="size-10 rounded-full"
					/>

					<div>
						<p className="text-neutral-300">Poppy Nicholls</p>
						<p className="text-neutral-500 text-sm">Frontend Lead, Dropbox</p>
					</div>
				</div>
			</div>

			{/* Stats */}

			<div className="max-w-xs">
				<p className="text-4xl font-bold">92%</p>
				<p className="text-lg text-neutral-500 mt-3">
					of users have found our platform helpful in their job search.
				</p>

				<div className="h-[0.5px] w-full bg-neutral-800 mt-6" />

				<p className="text-4xl font-bold mt-6">97%</p>
				<p className="text-lg text-neutral-500 mt-3">
					of users have recommended our platform to their peers.
				</p>
			</div>
		</section>
	);
}
