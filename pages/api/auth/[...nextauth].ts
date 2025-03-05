import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../ultimateyouth/ultimate/utils/prismadb";

const isDevelopment = process.env.NODE_ENV === "development";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("wrong username,try again or should alert the police 🧐?");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Wrong password. Try again");
        }

        return {
          id: user.id,
          name: user.name || '',
          username: user.username,
          emailVerified: user.emailVerified,
          imageSrc: user.imageSrc || '',
          phone: user.phone,
          role: user.role || '',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,

        //@ts-ignore
        role: token.user.role!,
        //@ts-ignore
        id: token.user.id,
        //@ts-ignore
        imageSrc: token.user.imageSrc,

      };
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
 debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
    maxAge: 28800, // 8 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
