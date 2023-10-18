import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const res = await fetch("https://fakestoreapi.com/users");
        const data = await res.json();
        const user = data.find(
          (u: any) => u.username === username && u.password === password
        );

        if (user) {
          return {
            id: user?.id,
            email: user?.email,
            name: user?.name?.firstname,
          };
        } else if (username == "admin" && password == "adminpass123") {
          return {
            id: 0,
            email: "admin@gmail.com",
            name: "Operator",
          };
        }

        throw new Error("Invalid Credentials!");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
