import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";

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
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token?.id) session.user.id = token.id;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/dashboard`;
      }
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    }
  },
};

const customHandler = async (req, ctx) => {
  const wantsJson = req.headers.get("accept")?.includes("application/json");

  let pagesConfig = {}
  if (wantsJson) {
    pagesConfig = { error: "/api/auth/json-error" }
  }

  const nextAuthHandler = NextAuth({
    ...authOptions,
    pages: pagesConfig,
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
