type Failed = {
  reason: "failed_to_fetch_past_interviews";
  error: string;
};

type Success = {
  routeId: string;
  interviewer: string;
  conversationLength: number;
  date: string;
};

type TypePastInterviews =
  | {
      success: false;
      data: Failed;
    }
  | {
      success: true;
      data: Success[];
    };

export type { TypePastInterviews, Success };
