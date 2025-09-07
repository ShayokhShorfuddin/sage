import Link from "next/link";
import { BsChatLeftTextFill } from "react-icons/bs";
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

              <p className="bg-neutral-800 w-fit py-0.5 px-1.5 rounded-md text-xs mt-3">
                {item.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
