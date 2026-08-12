import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const allowedEmail = process.env.ADMIN_EMAIL || "ryanchinqf2@gmail.com";
      const hash = process.env.ADMIN_PASSWORD_HASH;
      if (!hash || credentials.email !== allowedEmail || typeof credentials.password !== "string") return null;
      return await bcrypt.compare(credentials.password, hash)
        ? { id: "admin", email: allowedEmail, name: "RyanC" }
        : null;
    },
  })],
});
