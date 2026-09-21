import Link from "next/link";
import { deleteEvent, saveEvent } from "@/actions/events";
import { CloudinaryAssetField } from "@/components/content/cloudinary-asset-field";
import { prisma } from "@/lib/prisma";

type EventRow = { id: string; slug: string; title: string; event_kind: "upcoming" | "gallery"; starts_at: string; status: "draft" | "published" | "archived"; location: string | null; time_label: string | null; description: string | null; cover_image_url: string | null };
async function events() { try { const rows = await prisma.event.findMany({ orderBy: { startsAt: "desc" } }); return rows.map((event) => ({ id: event.id, slug: event.slug, title: event.title, event_kind: event.eventKind as EventRow["event_kind"], starts_at: event.startsAt.toISOString().slice(0, 10), status: event.status, location: event.location, time_label: event.timeLabel, description: event.description, cover_image_url: event.coverImageUrl })); } catch { return []; } }

function EventForm({ event }: { event?: EventRow }) {
  return <form action={saveEvent} className="grid gap-4 border border-white/10 bg-[#111113] p-5 md:grid-cols-2">
    {event && <input type="hidden" name="id" value={event.id} />}<label className="text-sm">Title<input required name="title" defaultValue={event?.title} className="mt-1 w-full border border-[#d8ded8] p-2" /></label><label className="text-sm">Slug<input required name="slug" defaultValue={event?.slug} pattern="[a-z0-9-]+" className="mt-1 w-full border border-[#d8ded8] p-2" /></label>
    <label className="text-sm">Type<select name="event_kind" defaultValue={event?.event_kind ?? "upcoming"} className="mt-1 w-full border border-[#d8ded8] p-2"><option value="upcoming">Upcoming</option><option value="gallery">Gallery</option></select></label><label className="text-sm">Date<input required type="date" name="starts_at" defaultValue={event?.starts_at} className="mt-1 w-full border border-[#d8ded8] p-2" /></label>
    <label className="text-sm">Status<select name="status" defaultValue={event?.status ?? "draft"} className="mt-1 w-full border border-[#d8ded8] p-2"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label><label className="text-sm">Location<input name="location" defaultValue={event?.location ?? ""} className="mt-1 w-full border border-[#d8ded8] p-2" /></label>
    {event?.cover_image_url && <input type="hidden" name="cover_image_url" value={event.cover_image_url} />}<div className="md:col-span-2"><CloudinaryAssetField name="cover_image_url" label="EVENT COVER IMAGE" /></div><label className="text-sm md:col-span-2">Description<textarea name="description" defaultValue={event?.description ?? ""} rows={4} className="mt-1 w-full border border-[#d8ded8] p-2" /></label><button className="w-fit bg-[#166a58] px-4 py-2 text-sm font-medium text-white">{event ? "Save changes" : "Create event"}</button>
  </form>;
}

export default async function EventsEditor() {
  const rows = await events();
  return <><Link href="/content" className="text-sm text-[#166a58] underline">Back to content</Link><h1 className="mt-3 text-3xl font-semibold">Events</h1><p className="mt-2 text-sm text-black/60">Draft events remain private. Publishing makes an event eligible for the public website query.</p><h2 className="mt-7 text-lg font-semibold">New event</h2><div className="mt-3"><EventForm /></div><div className="mt-8 space-y-5">{rows.map((event) => <section key={event.id}><h2 className="mb-2 font-semibold">Edit: {event.title}</h2><EventForm event={event} /><form action={deleteEvent} className="mt-2"><input type="hidden" name="id" value={event.id} /><button className="text-sm text-red-700 underline">Delete event</button></form></section>)}</div></>;
}
