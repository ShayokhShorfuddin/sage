"use client";
import { redirect } from "next/navigation";

export default function ChatNotFound() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p className="text-2xl text-red-500 font-medium mt-2">
        Couldn't find interview.
      </p>

      <p className="mt-1 max-w-xs text-center text-neutral-600">
        Check the history page for previous interviews.
      </p>

      <button
        type="button"
        className="mt-4 px-2 py-1 text-sm bg-neutral-800 text-neutral-200 rounded hover:bg-neutral-700 transition hover:cursor-pointer"
        onClick={() => {
          redirect("/home/history");
        }}
      >
        Check History
      </button>
    </div>
  );
}
