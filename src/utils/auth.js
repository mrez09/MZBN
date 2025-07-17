import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/connect"; // ✅ sesuai default export

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // ✅ penting!
  },
  callbacks: {
    async jwt({ token, user }) {
      // Saat login pertama kali, 'user' tersedia
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // Jika user belum ada di DB, ini bisa error → PrismaAdapter harus bikin otomatis
        token.role = dbUser?.role || "user";
      }

      return token;
    },
    async session({ session, token }) {
      console.log("🐛 SESSION DEBUG:", { token, session });
      //session.user.role = token.role; // Ambil role dari token, bukan user
      // Tambahkan pengecekan aman
      if (token?.role) {
        session.user.role = token.role;
      }
      console.log("🛡️ FINAL ROLE:", session.user.role);
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
