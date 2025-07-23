import NextAuth from "next-auth";
import authOptions from "@/utils/auth";

// ⛔ Mencegah eksekusi saat build static
export const dynamic = "force-dynamic";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
