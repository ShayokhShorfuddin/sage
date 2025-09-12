"use client";

import { useEffect, useState } from "react";
import {
  getAnalyticsData,
  type TypeGetAnalyticsData,
} from "@/app/actions/analytics";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsFailed from "./AnalyticsFailed";
import AnalyticsLoading from "./AnalyticsLoading";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] =
    useState<TypeGetAnalyticsData | null>(null);

  useEffect(() => {
    getAnalyticsData().then((data) => {
      setAnalyticsData(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="h-svh w-full">
      {loading && <AnalyticsLoading />}

      {!loading && analyticsData && !analyticsData.success && (
        <AnalyticsFailed />
      )}

      {!loading && analyticsData && analyticsData.success && (
        <>
          <p className="text-2xl font-semibold px-4 pt-4">Analytics</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <AnalyticsCard
              value={analyticsData.data.totalInterviews}
              title="Total Interviews"
            />
            <AnalyticsCard
              value={analyticsData.data.pendingInterviews}
              title="Pending Interviews"
            />
            <AnalyticsCard
              value={analyticsData.data.completedInterviews}
              title="Completed Interviews"
            />
            <AnalyticsCard
              value={analyticsData.data.longestConversation}
              title="Longest Conversation"
            />
            <AnalyticsCard
              value={analyticsData.data.shortestConversation}
              title="Shortest Conversation Length"
            />
            <AnalyticsCard
              value={analyticsData.data.averageConversation}
              title="Average Conversation Length"
            />
            <AnalyticsCard
              value={analyticsData.data.totalHires}
              title="Total Hires"
            />
            <AnalyticsCard
              value={analyticsData.data.totalRejections}
              title="Total Rejections"
            />
          </div>
        </>
      )}
    </section>
  );
}
