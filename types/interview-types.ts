type ResponseFromGemini = {
  text: string;
};

type NoResponseFromGemini = {
  reason: "gemini_response_failure";
  error: string;
};

type NoInterviewData = {
  reason: "no_interview_data";
  error: string;
};

type InterviewData = {
  interviewerName: string;
  chatHistory: ChatMessage[];
};

export type NoChatHistory = {
  reason: "no_chat_history";
  error: string;
};

type ChatMessagePart = {
  text: string;
};

export type ChatMessage = {
  role: "user" | "model";
  parts: ChatMessagePart[];
};

// Return type for handleMessageSubmission
type TypeHandleMessageSubmission =
  | {
      success: false;
      data: NoResponseFromGemini;
    }
  | {
      success: true;
      data: ResponseFromGemini;
    };

// Return type for GetInterviewDataAction
type TypeGetInterviewData =
  | {
      success: false;
      data: NoInterviewData;
    }
  | {
      success: true;
      data: InterviewData;
    };

// Return type for GetChatHistoryAction
type TypeGetChatHistory =
  | {
      success: false;
      data: NoChatHistory;
    }
  | {
      success: true;
      data: {
        chatHistory: ChatMessage[];
      };
    };

// Return type for SendMessageToGeminiAction
type TypeSendMessageToGemini =
  | {
      success: false;
      data:
        | NoChatHistory
        | {
            reason:
              | "no_interview_data"
              | "could_not_save_message"
              | "gemini_response_failure";
            error: string;
          };
    }
  | {
      success: true;
      text: string;
    };

// Return type for saveMessageToChatHistory
type TypeSaveMessageToChatHistory =
  | {
      success: false;
      data: {
        reason: "no_interview_data" | "could_not_save_message";
        error: string;
      };
    }
  | {
      success: true;
    };

export type {
  TypeGetInterviewData,
  TypeGetChatHistory,
  TypeSendMessageToGemini,
  TypeHandleMessageSubmission,
  TypeSaveMessageToChatHistory,
};
