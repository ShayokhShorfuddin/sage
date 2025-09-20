'use client';

import { redirect } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { IoSend } from 'react-icons/io5';
import { Toaster, toast } from 'sonner';
import {
  GetChatHistoryAndCompletionAction,
  handleMessageSubmission,
} from '@/app/actions/interview';
import { Textarea } from '@/components/ui/textarea';
import type { ChatMessage } from '@/types/interview-types';
import NewChatIndicator from '../../_components/NewChatIndicator';
import ChatLoading, { LoadingIcon } from './ChatLoading';
import ChatNotFound from './ChatNotFound';
import ChatStructure from './ChatStructure';

export default function Conversation({ routeId }: { routeId: string }) {
  const [isInterviewDone, setIsInterviewDone] = useState<boolean | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [history, setHistory] = useState<ChatMessage[]>();
  const formRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();

      // Check if the form is already submitting
      if (isPending) {
        return;
      }

      // Check if the textarea is empty or not
      // If not empty, submit the form
      if (formRef.current && formRef.current.value.trim() !== '') {
        formRef.current.form?.requestSubmit();
      }
    }
  };

  useEffect(() => {
    GetChatHistoryAndCompletionAction({ routeId }).then((result) => {
      if (!result.success) {
        toast.error('Failed to load chat history');
        setNotFound(true);
        return;
      }

      setHistory(result.data.chatHistory);
      setIsInterviewDone(result.data.isInterviewDone);

      setTimeout(() => {
        const chatStructure = document.getElementById('chat-structure');

        if (chatStructure) {
          chatStructure.scrollTo({
            top: chatStructure.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 500);
    });
  }, [routeId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get API Key from session
    const apiKey = sessionStorage.getItem('geminiApiKey');

    if (!apiKey || apiKey.trim() === '') {
      toast.error('Please add your Gemini API Key first.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const textArea = e.currentTarget['message-textarea'] as HTMLTextAreaElement;
    const messageText = textArea.value.replace(/\r?\n|\r/g, ' ').trim();

    startTransition(async () => {
      const response = await handleMessageSubmission(formData, apiKey);

      if (!response.success) {
        toast.error('Failed to send message. Please try again.', {
          description: response.data.error,
        });
        return;
      }

      // User's message
      const userMessage: ChatMessage = {
        role: 'user',
        parts: [{ text: messageText }],
      };
      // Gemini response
      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: response.data.text }],
      };

      // If the response is successful
      textArea.value = ''; // clear the box

      // Refresh the chat history so the new message appears
      setHistory((history) =>
        history
          ? [...history, userMessage, modelMessage]
          : [userMessage, modelMessage],
      );

      setIsInterviewDone(response.data.isInterviewDone);

      setTimeout(() => {
        const chatStructure = document.getElementById('chat-structure');

        if (chatStructure) {
          chatStructure.scrollTo({
            top: chatStructure.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, 500);
    });
  }

  return (
    <section className="flex flex-col h-svh w-full">
      {history == null && notFound === false && <ChatLoading />}

      {history == null && notFound === true && <ChatNotFound />}

      {history != null && history.length === 0 && <NewChatIndicator />}

      {history != null && history.length > 0 && (
        <ChatStructure chatHistory={history} />
      )}

      {/* If interview is concluded */}
      {isInterviewDone && (
        <div className="w-full text-center font-medium pt-5">
          <button
            type="button"
            onClick={() => {
              redirect(`/home/report/${routeId}`);
            }}
            className="py-1 px-3 hover:cursor-pointer bg-neutral-200 text-neutral-900 rounded mb-10 text-sm"
          >
            Generate Final Summary
          </button>
        </div>
      )}

      {/* If interview is not done, show the form */}
      {isInterviewDone === false && (
        <form
          onSubmit={onSubmit}
          className="sticky bottom-10 mx-5 md:mx-10 xl:mx-30"
        >
          <input type="hidden" name="routeId" value={routeId} />

          <div className="flex justify-center items-end gap-x-3">
            <div className="relative w-full">
              <Textarea
                ref={formRef}
                name="message-textarea"
                onKeyDown={onKeyDown}
                className="bg-neutral-900 dark:bg-neutral-900"
                placeholder="Type your message here."
              />
              <p className="absolute -top-6 right-0">
                <kbd className="bg-background text-muted-foreground pointer-events-none h-5 rounded border px-1 font-sans text-[0.7rem] font-medium select-none">
                  Shift
                </kbd>{' '}
                <kbd className="bg-background text-muted-foreground pointer-events-none h-5 rounded border px-1 font-sans text-[0.7rem] font-medium select-none">
                  Enter
                </kbd>
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="disabled:cursor-not-allowed bg-neutral-800 p-3 rounded-full enabled:hover:cursor-pointer enabled:hover:bg-neutral-700 transition"
            >
              {isPending ? (
                <LoadingIcon />
              ) : (
                <IoSend color="#ffffff" size={18} />
              )}
            </button>
          </div>
        </form>
      )}

      <Toaster position="bottom-right" richColors />
    </section>
  );
}
