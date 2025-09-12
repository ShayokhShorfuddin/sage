"use client";

export default function AnalyticsFailed() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p className="text-2xl text-red-500 font-medium mt-2">
        Failed to load analytics.
      </p>

      <p className="mt-1 max-w-xs text-center text-neutral-600">
        Try refreshing the page or come back later.
      </p>

      <button
        type="button"
        className="mt-4 px-2 py-1 text-sm bg-neutral-800 text-neutral-200 rounded hover:bg-neutral-700 transition hover:cursor-pointer"
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh
      </button>
    </div>
  );
}
