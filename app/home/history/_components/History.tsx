"use client";

import { useEffect, useState } from "react";
import { getPastInterviews } from "@/app/actions/history";
import type { Success } from "@/types/history-types";
import HistoryList from "./HistoryList";

export default function History() {
  const [data, setData] = useState<Success[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedSuccessfully, setFetchedSuccessfully] = useState(false);

  useEffect(() => {
    getPastInterviews().then((response) => {
      if (!response.success) {
        setIsLoading(false);
      } else {
        setData(response.data);
        setFetchedSuccessfully(true);
      }

      setIsLoading(false);
    });
  }, []);

  return (
    <section className="w-full">
      <ul className="flex flex-col">{isLoading && <li>Loading...</li>}</ul>
      {!isLoading && !fetchedSuccessfully && (
        <div className="text-center text-red-500">Failed to fetch history.</div>
      )}
      {!isLoading && fetchedSuccessfully && (
        <HistoryList data={data as Success[]} />
      )}
    </section>
  );
}
