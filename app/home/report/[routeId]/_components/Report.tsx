"use client";

import { useEffect, useState, useTransition } from "react";
import { Toaster, toast } from "sonner";
import {
  ReportGenerationAction,
  type TypeReportResponse,
} from "@/app/actions/report-generation";
import ReportDetails from "./ReportDetails";
import ReportLoading from "./ReportLoading";
import ReportLoadingFailed from "./ReportLoadingFailed";

export default function Report({ routeId }: { routeId: string }) {
  // We are bringing an additional state because relying on isPending solely cause a flash of unwanted content (FOUC) on {!isPending && !reportData && <ReportLoadingFailed />}. Basically, it shows "Error" component for like 1 second and then shows the loading
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<TypeReportResponse>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Fetch report data using routeId
    startTransition(() => {
      setIsLoading(true);

      ReportGenerationAction({ routeId }).then((data) => {
        if (!data.success) {
          toast.error(`Error generating report: ${data.data.reason}`, {
            id: "report-toaster",
          });
          return;
        }

        setReportData(data);
        setIsLoading(false);
      });
    });
  }, [routeId]);

  return (
    <section className="h-svh w-full">
      {isPending && <ReportLoading />}

      {isLoading && !reportData && <ReportLoadingFailed />}

      {!isPending && reportData && reportData.success && (
        <ReportDetails
          isHired={reportData.data.isHired}
          knowledgeScore={reportData.data.knowledgeScore}
          communicationScore={reportData.data.communicationScore}
          codeQualityScore={reportData.data.codeQualityScore}
          reasonForNoHire={reportData.data.reasonForNoHire}
        />
      )}

      <Toaster id="report-toaster" richColors />
    </section>
  );
}
