import { redirect } from "next/navigation";

export default function ReportUnfinished({ routeId }: { routeId: string }) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p className="text-2xl text-neutral-200 font-medium mt-2">
        Unfinished Interview
      </p>

      <p className="mt-1 max-w-xs text-center text-neutral-600">
        Go back to the interview and complete it to generate the report.
      </p>

      <button
        type="button"
        className="mt-4 px-2 py-1 text-sm bg-neutral-800 text-neutral-200 rounded hover:bg-neutral-700 transition hover:cursor-pointer"
        onClick={() => {
          redirect(`${window.location.origin}/home/interview/${routeId}`);
        }}
      >
        Go to interview
      </button>
    </div>
  );
}
