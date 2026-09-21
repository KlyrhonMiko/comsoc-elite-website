"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const credentials = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function login(formData: FormData) {
  const parsed = credentials.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/login?error=Enter+a+valid+email+and+password.");
  if (
    process.env.NODE_ENV === "development" &&
    process.env.CMS_DEMO_MODE === "true" &&
    parsed.data.email === process.env.CMS_DEMO_EMAIL &&
    parsed.data.password === process.env.CMS_DEMO_PASSWORD
  ) {
    const store = await cookies();
    store.set("comsoc-demo-session", "active", { httpOnly: true, sameSite: "lax", path: "/admin" });
    redirect("/dashboard");
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error) redirect("/login?error=Invalid+email+or+password.");
    const { data: { user } } = await supabase.auth.getUser();
    const { data: admin } = await supabase.from("cms_admins").select("user_id").eq("user_id", user?.id ?? "").maybeSingle();
    if (!admin) {
      await supabase.auth.signOut();
      redirect("/login?error=This+account+is+not+authorized+for+the+CMS.");
    }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
    redirect("/login?error=CMS+authentication+is+not+configured.");
  }
  redirect("/dashboard");
}

export async function logout() {
  const store = await cookies();
  store.delete("comsoc-demo-session");
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // A local demo session has no Supabase session to clear.
  }
  redirect("/login");
}
