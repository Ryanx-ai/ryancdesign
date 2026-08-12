import { signIn } from "@/auth";

export default function Login() {
  async function login(formData: FormData) { "use server"; await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/admin" }); }
  return <main className="admin shell"><form className="admin-card" action={login}><span className="eyebrow">Private workspace</span><h1>Portfolio admin</h1><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div><div className="field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" required /></div><button className="button primary" type="submit">Sign in</button></form></main>;
}
