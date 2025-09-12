export { auth as middleware } from "@/auth";

export const config = {
  runtime: "nodejs",
  matcher: ["/home/:path*"],
};
