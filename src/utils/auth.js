import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Pertama kali login
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        token.role = dbUser?.role || "user"; // fallback default
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Ambil role dari token, bukan user
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
