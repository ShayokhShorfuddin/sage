"use client";

import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import {
  GetChatHistoryAction,
  handleMessageSubmission,
} from "@/app/actions/interview-new";
import { Textarea } from "@/components/ui/textarea";
import type { TypeGetChatHistory } from "@/types/interview-types";
import NewChatIndicator from "../../_components/NewChatIndicator";
import ChatLoading from "./ChatLoading";
import ChatStructure from "./ChatStructure";

export default function Conversation({ routeId }: { routeId: string }) {
  const [result, setResult] = useState<TypeGetChatHistory>();

  useEffect(() => {
    GetChatHistoryAction(routeId).then((res) => {
      setResult(res);
    });
  }, [routeId]);

  return (
    <section className="relative w-full">
      <div className="w-full">
        {result == null ? (
          <ChatLoading />
        ) : !result?.success ? (
          <p className="text-red-600">Failed to get interview history</p>
        ) : result?.data.chatHistory.length === 0 ? (
          <NewChatIndicator />
        ) : (
          <ChatStructure chatHistory={result.data.chatHistory} />
        )}
      </div>

      {/* TODO: We need to rerender when we get the response back!!! */}
      <form
        action={handleMessageSubmission}
        className="sticky right-0 bottom-10 w-1/2"
      >
        <input type="hidden" name="routeId" value={routeId} />

        <div className="flex justify-center items-end gap-x-3">
          <Textarea
            name="message-textarea"
            placeholder="Type your message here."
          />

          <button
            type="submit"
            className="bg-neutral-800 p-3 rounded-full hover:cursor-pointer hover:bg-neutral-700 transition"
          >
            <IoSend color="#ffffff" size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
