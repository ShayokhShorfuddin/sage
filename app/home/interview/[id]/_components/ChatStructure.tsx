import type { ChatMessage } from "@/types/interview-types";

export default function ChatStructure({
  chatHistory,
}: {
  chatHistory: ChatMessage[];
}) {
  return (
    <div
      id="chat-structure"
      className="flex-1 overflow-y-auto flex justify-center w-full h-full px-5 pt-4 mb-5 md:mb-20"
    >
      <ul className="flex flex-col gap-y-3 w-full max-w-4xl mb-30">
        {chatHistory.map((message, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <We won't be reordering. So no worries.>
          <li key={index}>
            <p className="text-neutral-600">
              {message.role === "user" ? "You" : "AI"}
            </p>
            <p className="text-neutral-400">{message.parts[0].text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
