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

export type TypeSignIn =
  | {
      success: false;
      reason: string;
      message: string;
    }
  | {
      success: true;
    };
