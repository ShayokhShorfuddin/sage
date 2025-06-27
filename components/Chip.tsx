import { Sparkles } from "lucide-react";

export default function Chip() {
	return (
		<div className="flex items-center gap-x-2 px-5 py-2 bg-neutral-900 rounded-full select-none">
			<Sparkles className="stroke-neutral-200 size-5" />
			<p className="text-sm text-neutral-200">
				Trusted By Over 1 Million Developers Worldwide
			</p>
		</div>
	);
}
