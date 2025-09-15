export type TypeSignUp =
  | {
      success: false;
      reason: string;
      message: string;
    }
  | {
      success: true;
      userName: string;
    };
