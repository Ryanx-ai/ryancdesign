import type { NextAuthConfig } from "next-auth";

const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      if (!request.nextUrl.pathname.startsWith("/admin")) return true;
      if (request.nextUrl.pathname === "/admin/login") return true;
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
