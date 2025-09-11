"use client";

import { useEffect, useState, useTransition } from "react";
import { Toaster, toast } from "sonner";
import {
  ReportGenerationAction,
  type TypeReportResponse,
} from "@/app/actions/report-generation";
import ReportDetails from "./ReportDetails";
import ReportLoading from "./ReportLoading";

export default function Report({ routeId }: { routeId: string }) {
  const [reportData, setReportData] = useState<TypeReportResponse>();
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   // Fetch report data using routeId
  //   startTransition(() => {
  //     ReportGenerationAction({ routeId }).then((data) => {
  //       if (!data.success) {
  //         toast.error(`Error generating report: ${data.data.reason}`);
  //         return;
  //       }

  //       setReportData(data);
  //     });
  //   });
  // }, [routeId]);

  return (
    <section className="h-svh w-full">
      {isPending && <ReportLoading />}

      {/* {!isPending && reportData && <ReportDetails />} */}
      <ReportDetails />

      <Toaster position="top-right" richColors />
    </section>
  );
}

// TODO: Save generated reports to DB for reusing
