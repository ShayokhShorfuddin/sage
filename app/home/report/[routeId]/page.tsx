import Report from "./_components/Report";

export default async function Page({
  params,
}: {
  params: { routeId: string };
}) {
  const { routeId } = await params;

  return <Report routeId={routeId} />;
}
