"use client";

import Link from "next/link";
import { BsChatLeftTextFill } from "react-icons/bs";
import { Toaster, toast } from "sonner";
import PdfGenerationAction from "@/app/actions/pdf-generation";
import type { Success } from "@/types/history-types";

export default function HistoryList({ data }: { data: Success[] }) {
  return (
    <>
      {data.length === 0 && <p className="p-4">No interview history found.</p>}

      {data.length > 0 && (
        <p className="text-2xl font-semibold px-4 pt-4">History</p>
      )}

      {data.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch p-4">
          {data.map((item) => (
            <li
              key={item.routeId}
              className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg h-full transition"
            >
              <p className="text-lg font-medium">{item.interviewer}</p>

              <div className="flex items-center gap-x-1">
                <BsChatLeftTextFill size={14} />

                <p>{item.conversationLength}</p>
              </div>

              <Link
                href={`/home/interview/${item.routeId}`}
                className="text-xs underline hover:text-blue-400 transition duration-200"
              >
                {item.routeId.slice(0, 16)}...{item.routeId.slice(-4)}
              </Link>

              <div className="flex justify-between">
                <p className="bg-neutral-800 w-fit py-0.5 px-1.5 rounded-md text-xs mt-3">
                  {item.date}
                </p>

                <button
                  type="button"
                  // TODO: Style this button
                  onClick={() => {
                    handleDownload({
                      routeId: item.routeId,
                      date: item.date,
                      candidate: "Random Guy",
                      interviewer: item.interviewer,
                    });
                  }}
                >
                  Download PDF
                </button>
              </div>
            </li>
          ))}

          <Toaster position="bottom-right" richColors />
        </ul>
      )}
    </>
  );
}

async function handleDownload({
  routeId,
  date,
  candidate,
  interviewer,
}: {
  routeId: string;
  date: string;
  candidate: string;
  interviewer: string;
}) {
  const generatingToastId = toast.loading("Generating...");

  const response = await PdfGenerationAction({
    routeId: routeId,
    interviewer: interviewer,
    date: date,
    candidate: candidate,
    absoluteUrl: `${window.location.origin}/home/interview/${routeId}`,
  });

  if (!response.success) {
    toast.error("Failed to generate PDF. Please try again.", {
      id: generatingToastId,
    });
    return;
  }

  toast.success("PDF generated successfully!", { id: generatingToastId });

  // convert back to Blob and trigger download
  try {
    const blob = await (await fetch(response.data)).blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sage Interview - ${candidate}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    toast.error("Failed to download PDF. Please try again.", {
      id: generatingToastId,
    });
  }
}
