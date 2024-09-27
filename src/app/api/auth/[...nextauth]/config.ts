import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { NEXT_AUTH, SOCIAL_NETWORKS } from "@/backend/shared/config";
import { controller } from "@/backend/auth/v1";

declare module "next-auth" {
  interface DefaultUser {
    module?: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: SOCIAL_NETWORKS.GOOGLE.clientId,
      clientSecret: SOCIAL_NETWORKS.GOOGLE.clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: SOCIAL_NETWORKS.FACEBOOK.clientId,
      clientSecret: SOCIAL_NETWORKS.FACEBOOK.clientSecret,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: "register",
      name: "Register",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        name: {
          label: "Name",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        phone: {
          label: "Phone",
          type: "text",
        },
        callbackUrl: {
          label: "callbackUrl",
          type: "text",
        },
      },

      async authorize(params) {
        if (!params) throw { message: "Parámetros incorrectos." };

        const {
          status,
          data: user,
          error,
        } = await controller.createUserByForm({
          body: {
            email: params.email,
            name: params.name,
            password: params.password,
            phone: params.phone,
            type: "form",
          },
        });

        if (error || !status) throw { message: error };

        user.module = "newUser";

        // Send email verification
        controller.sendVerificationRequest({
          body: {
            email: params.email,
            url: params.callbackUrl,
            type: "verifyEmail",
          },
          params: {
            source: "register",
          },
        });

        return user;
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(params) {
        if (!params) throw { message: "Parameters are missing." };

        const {
          status,
          data: user,
          error,
        } = await controller.getUserByCredentials({
          body: {
            email: params?.email,
            password: params?.password,
          },
        });

        if (error || !status) throw { message: error };

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (user.email?.includes("@gmail.com")) {
          throw { message: "Por favor, utiliza un email corporativo." };
        }
      }
      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      const userData = await prisma.user.findUnique({
        where: { email: session.user.email }
      });

      if (!userData) throw new Error("User not found");

      // Assign user data to session
      session.user.id = token.sub as string;
      session.user.phone = userData.phone || "";
      session.user.emailVerified = userData.emailVerified;
      session.user.permissions = userData.permissions;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  adapter: {
    ...PrismaAdapter(prisma),
    async createUser(profile: { email: any; name: any; }) {
      const {
        status,
        data: user,
        error,
      } = await controller.createUserByForm({
        body: {
          email: profile.email,
          name: profile.name,
          password: v4(),
          phone: "private",
          type: "social",
        },
      });
      if (error || !status) throw { message: error };
      return user;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: NEXT_AUTH.jwtSecret,
  },
  secret: NEXT_AUTH.secret,
};
