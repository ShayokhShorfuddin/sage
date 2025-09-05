import type { ChatMessage } from "@/types/interview-types";

export default function ChatStructure({
  chatHistory,
}: {
  chatHistory: ChatMessage[];
}) {
  return (
    // TODO: Make this look pretty
    <div className="flex justify-center w-full h-full px-5">
      <div className="flex flex-col gap-y-3 w-full max-w-4xl">
        {chatHistory.map((message, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <We won't be reordering. So no worries.>
          <div key={index}>
            <p className="text-neutral-600">
              {message.role === "user" ? "You" : "AI"}
            </p>
            <p className="text-neutral-400">{message.parts[0].text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
