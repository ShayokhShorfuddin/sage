export default function AnalyticsCard({
  value,
  title,
}: {
  value: number;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-neutral-900 rounded-md">
      <p className="text-4xl font-medium">{value}</p>
      <p className="text-neutral-600 text-sm mt-2">{title}</p>
    </div>
  );
}
