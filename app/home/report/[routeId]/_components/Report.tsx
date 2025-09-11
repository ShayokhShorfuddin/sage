"use client";

import {
  ReportGenerationAction,
  type TypeReportResponse,
} from "@/app/actions/report-generation";
import { useEffect, useState } from "react";
import ReportDetails from "./ReportDetails";
import ReportLoading from "./ReportLoading";
import ReportLoadingFailed from "./ReportLoadingFailed";
import ReportUnfinished from "./ReportUnfinished";

export default function Report({ routeId }: { routeId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInterviewUnfinished, setIsInterviewUnfinished] = useState<
    boolean | null
  >(null);
  const [reportData, setReportData] = useState<TypeReportResponse>();

  useEffect(() => {
    // Fetch report data using routeId
    ReportGenerationAction({ routeId }).then((response) => {
      if (!response.success) {
        if (response.data.reason === "unfinished_interview") {
          setIsInterviewUnfinished(true);
        }
      }

      setIsLoading(false);
      setReportData(response);
    });
  }, [routeId]);

  return (
    <section className="h-svh w-full">
      {/* TODO: Logic below is messed up and confusing to understand. Restructure with better conditional  */}
      {isLoading && <ReportLoading />}

      {!isLoading &&
        reportData &&
        !reportData.success &&
        !isInterviewUnfinished && <ReportLoadingFailed />}

      {!isLoading &&
        reportData &&
        !reportData.success &&
        isInterviewUnfinished && <ReportUnfinished routeId={routeId} />}

      {!isLoading && reportData && reportData.success && (
        <ReportDetails
          isHired={reportData.data.isHired}
          knowledgeScore={reportData.data.knowledgeScore}
          communicationScore={reportData.data.communicationScore}
          codeQualityScore={reportData.data.codeQualityScore}
          reasonForNoHire={reportData.data.reasonForNoHire}
        />
      )}
    </section>
  );
}
