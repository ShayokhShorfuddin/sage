const errorMap = new Map<string, string>([
  ["USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL", "User already exists."],
  ["", ""],
]);

export default function getFriendlyErrorMessage(errorCode: string): string {
  return errorMap.get(errorCode) || "An unknown error occurred.";
}
