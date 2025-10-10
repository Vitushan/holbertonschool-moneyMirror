import NextAuth from "next-auth"; //initializes the authentication manager (config/handler that Next.js will call for auth routes)
import CredentialsProvider from "next-auth/providers/credentials"; //email/password authentication (This provider calls the authorize function to validate credentials.)
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",  //credentials = object that contains the user's login information.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("NextAuth authorize called with:", credentials?.email); //the "?."" allows not to crash if 'credentials' is undefined or null
        
        if (!credentials?.email || !credentials?.password) { //checks that the user has correctly entered their email and password
          console.log("Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.log("Invalid password for:", credentials.email);
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
  }
});

export { handler as GET, handler as POST }; //Next.js App Router (route.ts/route.js files) supports HTTP GET and POST requests to this route
