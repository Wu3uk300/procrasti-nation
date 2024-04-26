import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export default async function middleWare(req: NextRequest) {
  return withAuth(req);
}
export const config = {
  matcher: ["/all", "/new", "/create"],
};
