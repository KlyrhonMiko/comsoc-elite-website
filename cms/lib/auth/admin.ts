import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const demoEnabled = () => process.env.NODE_ENV === "development" && process.env.CMS_DEMO_MODE === "true";

export async function getAdmin() {
  const store = await cookies();
  if (demoEnabled() && store.get("comsoc-demo-session")?.value === "active") {
    return { id: "local-demo-admin", email: process.env.CMS_DEMO_EMAIL };
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase.from("cms_admins").select("user_id").eq("user_id", user.id).maybeSingle();
    return data ? user : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdmin();
  if (!user) redirect("/login");
  return user;
}
