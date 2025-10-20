import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";


// Reusable NextAuth options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          if (typeof wantsJson !== 'undefined' && wantsJson) throw new Error("Missing credentials");
          return null;
        }
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) {
          if (typeof wantsJson !== 'undefined' && wantsJson) throw new Error("User not found");
          return null;
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          if (typeof wantsJson !== 'undefined' && wantsJson) throw new Error("Invalid password");
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token?.id) session.user.id = token.id;
      return session;
    }
  },
};

// Custom handler that wraps NextAuth with JSON error handling
const customHandler = async (req, ctx) => {
  const wantsJson = req.headers.get("accept")?.includes("application/json");
  const nextAuthHandler = NextAuth({
    ...authOptions,
    pages: wantsJson ? { error: "/api/auth/json-error" } : {},
  });
  try {
    return await nextAuthHandler(req, ctx);
  } catch (err) {
    if (wantsJson) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    throw err;
  }
};

export { customHandler as GET, customHandler as POST };
