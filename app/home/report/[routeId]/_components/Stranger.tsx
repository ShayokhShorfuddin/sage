'use client';

import { useRouter } from 'next/navigation';

export default function Stranger() {
  const router = useRouter();
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-2">
      <p className="text-2xl text-red-500 font-medium mt-2">Unauthorized</p>

      <p className="mt-1 max-w-xs text-center text-neutral-600">
        You do not have permission to view this report.
      </p>

      <button
        type="button"
        className="mt-4 px-2 py-1 text-sm bg-neutral-800 text-neutral-200 rounded hover:bg-neutral-700 transition hover:cursor-pointer"
        onClick={() => {
          router.replace('/home');
        }}
      >
        Go home
      </button>
    </div>
  );
}
