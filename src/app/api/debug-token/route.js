// app/api/debug-token/route.js
import { getToken } from "next-auth/jwt";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return Response.json({ token });
}
