import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Dev Credentials",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        return prisma.user.upsert({
          where: { email: credentials.email },
          update: {},
          create: { email: credentials.email, name: credentials.email.split("@")[0] }
        });
      }
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      server: process.env.EMAIL_SERVER
    })
  ],
  pages: { signIn: "/signin" }
};
