export const dynamic = "force-dynamic";
// app/api/testenv/route.js
export async function GET() {
  return Response.json({
    url: process.env.NEXTAUTH_URL,
    secret: process.env.NEXTAUTH_SECRET,
  });
}
