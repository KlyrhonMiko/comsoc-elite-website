"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

const eventSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(160),
  event_kind: z.enum(["upcoming", "gallery"]),
  starts_at: z.string().date(),
  status: z.enum(["draft", "published", "archived"]),
  location: z.string().max(160).optional(),
  time_label: z.string().max(80).optional(),
  description: z.string().max(10000).optional(),
});

function data(formData: FormData) {
  const result = eventSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) throw new Error("Invalid event data.");
  return result.data;
}

export async function saveEvent(formData: FormData) {
  await requireAdmin();
  const values = data(formData);
  const db = await createClient();
  const { id, ...record } = values;
  const mutation = id ? db.from("events").update(record).eq("id", id) : db.from("events").insert(record);
  const { error } = await mutation;
  if (error) throw new Error("Unable to save event.");
  revalidatePath("/content/events");
  revalidatePath("/content");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(formData.get("id"));
  const db = await createClient();
  const { error } = await db.from("events").delete().eq("id", id);
  if (error) throw new Error("Unable to delete event.");
  revalidatePath("/content/events");
  revalidatePath("/content");
}
