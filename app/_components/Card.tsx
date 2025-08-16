export default function Card({
	icon,
	heading,
	description,
}: {
	icon: React.ReactNode;
	heading: string;
	description: string;
}) {
	return (
		<div className="p-4 max-w-sm bg-neutral-900 rounded-md">
			{icon}
			<p className="text-neutral-200 mt-4 text-lg font-semibold">{heading}</p>
			<p className="text-sm xs:text-base mt-2 text-neutral-400">
				{description}
			</p>
		</div>
	);
}
