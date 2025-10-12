
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import bcrypt from "bcryptjs";

// Patch pour forcer la réponse JSON si Accept: application/json
const customHandler = async (req, ctx) => {
  // On détecte si la requête demande du JSON
  const wantsJson = req.headers.get("accept")?.includes("application/json");
  // On wrappe NextAuth
  const nextAuthHandler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          console.log("NextAuth authorize called with:", credentials?.email);
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            // Si API attend JSON, on lève une erreur explicite
            if (wantsJson) throw new Error("Missing credentials");
            return null;
          }
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (!user) {
            console.log("User not found:", credentials.email);
            if (wantsJson) throw new Error("User not found");
            return null;
          }
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            console.log("Invalid password for:", credentials.email);
            if (wantsJson) throw new Error("Invalid password");
            return null;
          }
          console.log("Login successful for:", user.email);
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
    // Ajout d'un handler d'erreur pour forcer le JSON
    pages: wantsJson ? {
      error: "/api/auth/json-error"
    } : {},
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
