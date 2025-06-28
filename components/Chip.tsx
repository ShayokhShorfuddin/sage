import { Sparkles } from "lucide-react";

export default function Chip() {
	return (
		<div className="flex items-center gap-x-2 px-5 py-2 bg-neutral-900 rounded-full select-none mx-[1rem]">
			<Sparkles className="stroke-neutral-200 size-5" />
			<p className="text-xs xs:text-sm text-neutral-200 text-center">
				Trusted By Over 1 Million <br className="xs:hidden" /> Developers
				Worldwide
			</p>
		</div>
	);
}
