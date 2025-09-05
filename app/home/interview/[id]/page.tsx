import Conversation from "./_components/Conversation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Conversation routeId={id} />;
}
