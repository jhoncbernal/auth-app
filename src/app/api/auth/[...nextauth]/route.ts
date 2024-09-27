import NextAuth from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };