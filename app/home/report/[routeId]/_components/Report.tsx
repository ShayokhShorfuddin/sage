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
  const [reportData, setReportData] = useState<TypeReportResponse>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Fetch report data using routeId
    startTransition(() => {
      ReportGenerationAction({ routeId }).then((data) => {
        if (!data.success) {
          toast.error(`Error generating report: ${data.data.reason}`, {
            id: "report-toaster",
          });
          return;
        }

        setReportData(data);
      });
    });
  }, [routeId]);

  return (
    <section className="h-svh w-full">
      {isPending && <ReportLoading />}

      {!isPending && !reportData && <ReportLoadingFailed />}

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
