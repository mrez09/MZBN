// app/api/testvercel/route.js
export async function GET() {
  return Response.json({ status: "vercel okay" });
}
