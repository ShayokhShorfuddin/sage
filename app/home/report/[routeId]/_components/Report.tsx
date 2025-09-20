'use client';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import {
  ReportGenerationAction,
  type TypeReportResponse,
} from '@/app/actions/report-generation';
import ReportDetails from './ReportDetails';
import ReportLoading from './ReportLoading';
import ReportLoadingFailed from './ReportLoadingFailed';
import ReportUnfinished from './ReportUnfinished';
import Stranger from './Stranger';

export default function Report({
  routeId,
  email,
}: {
  routeId: string;
  email: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isStranger, setIsStranger] = useState<boolean>(true);
  const [isInterviewUnfinished, setIsInterviewUnfinished] = useState<
    boolean | null
  >(null);
  const [reportData, setReportData] = useState<TypeReportResponse>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: false
  useEffect(() => {
    // Get API Key from session
    const apiKey = sessionStorage.getItem('geminiApiKey');

    if (!apiKey || apiKey.trim() === '') {
      toast.error('Please add your Gemini API Key first.');
      return;
    }

    // Fetch report data using routeId
    ReportGenerationAction({ routeId, apiKey, email }).then((response) => {
      if (!response.success) {
        // Stranger trying to access the report
        if (response.data.reason === 'stranger') {
          setIsStranger(true);
        }

        if (response.data.reason === 'unfinished_interview') {
          setIsInterviewUnfinished(true);
        }
      }

      setIsLoading(false);
      setReportData(response);
    });
  }, [routeId]);

  return (
    <section className="h-svh w-full">
      {isLoading && <ReportLoading />}

      {!isLoading &&
        reportData &&
        !reportData.success &&
        !isInterviewUnfinished && <ReportLoadingFailed />}

      {!isLoading &&
        reportData &&
        !reportData.success &&
        isInterviewUnfinished && <ReportUnfinished routeId={routeId} />}

      {/* Stranger */}
      {!isLoading && reportData && !reportData.success && <Stranger />}

      {!isLoading && reportData && reportData.success && (
        <ReportDetails
          isHired={reportData.data.isHired}
          knowledgeScore={reportData.data.knowledgeScore}
          communicationScore={reportData.data.communicationScore}
          codeQualityScore={reportData.data.codeQualityScore}
          reasonForNoHire={reportData.data.reasonForNoHire}
        />
      )}

      <Toaster richColors />
    </section>
  );
}
