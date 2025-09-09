"use client";

import { useEffect, useState, useTransition } from "react";
import { IoSend } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import {
  GetChatHistoryAction,
  handleMessageSubmission,
} from "@/app/actions/interview";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMessage } from "@/types/interview-types";
import NewChatIndicator from "../../_components/NewChatIndicator";
import ChatLoading, { LoadingIcon } from "./ChatLoading";
import ChatStructure from "./ChatStructure";

export default function Conversation({ routeId }: { routeId: string }) {
  // State for button disabling
  const [isPending, startTransition] = useTransition();
  const [history, setHistory] = useState<ChatMessage[]>();

  useEffect(() => {
    GetChatHistoryAction(routeId).then((result) => {
      if (!result.success) {
        toast.error("Failed to load chat history");
        return;
      }

      setHistory(result.data.chatHistory);
    });
  }, [routeId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const textArea = e.currentTarget["message-textarea"] as HTMLTextAreaElement;
    const messageText = textArea.value.replace(/\r?\n|\r/g, " ").trim();

    startTransition(async () => {
      const response = await handleMessageSubmission(formData);

      if (!response.success) {
        toast.error("Failed to send message. Please try again.", {
          description: response.data.error,
        });
        return;
      }

      // User's message
      const userMessage: ChatMessage = {
        role: "user",
        parts: [{ text: messageText }],
      };
      // Gemini response
      const modelMessage: ChatMessage = {
        role: "model",
        parts: [{ text: response.data.text }],
      };

      // If the response is successful
      textArea.value = ""; // clear the box

      // Scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      // refresh the chat history so the new message appears
      setHistory((history) =>
        history
          ? [...history, userMessage, modelMessage]
          : [userMessage, modelMessage],
      );
    });
  }

  return (
    <section className="relative w-full">
      <div className="w-full">
        {history == null ? (
          <ChatLoading />
        ) : history.length === 0 ? (
          <NewChatIndicator />
        ) : (
          <ChatStructure chatHistory={history} />
        )}
      </div>

      <form onSubmit={onSubmit} className="sticky right-0 bottom-10 w-1/2">
        <input type="hidden" name="routeId" value={routeId} />

        <div className="flex justify-center items-end gap-x-3">
          <Textarea
            name="message-textarea"
            placeholder="Type your message here."
          />

          <button
            type="submit"
            disabled={isPending}
            className="disabled:cursor-not-allowed bg-neutral-800 p-3 rounded-full enabled:hover:cursor-pointer enabled:hover:bg-neutral-700 transition"
          >
            {isPending ? <LoadingIcon /> : <IoSend color="#ffffff" size={18} />}
          </button>
        </div>
      </form>

      <Toaster position="bottom-right" richColors />
    </section>
  );
}
