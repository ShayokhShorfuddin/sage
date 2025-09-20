'use client';

import { useEffect, useState } from 'react';
import { getPastInterviews } from '@/app/actions/history';
import type { Success } from '@/types/history-types';
import HistoryList from './HistoryList';

export default function History({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  const [data, setData] = useState<Success[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedSuccessfully, setFetchedSuccessfully] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    getPastInterviews({ candidateEmail: email }).then((response) => {
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
    <section className="w-full h-svh">
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <p>Just a sec...</p>
        </div>
      )}

      {!isLoading && !fetchedSuccessfully && (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">Failed to retrieve history.</p>
        </div>
      )}

      {!isLoading && fetchedSuccessfully && (
        <HistoryList
          data={data as Success[]}
          username={username}
          email={email}
        />
      )}
    </section>
  );
}
