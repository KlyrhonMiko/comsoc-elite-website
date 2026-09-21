import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function count(table: string) { try { const db = await createClient(); const { count, error } = await db.from(table).select("*", { count: "exact", head: true }); return error ? null : count ?? 0; } catch { return null; } }

export default async function Dashboard() {
  const [people, faculty, events] = await Promise.all([count("organization_people"), count("faculty_members"), count("events")]);
  return <><p className="font-mono text-[11px] tracking-[0.2em] text-emerald-300">SYSTEM / OVERVIEW</p><h1 className="mt-3 font-display text-4xl font-light tracking-[0.04em] text-white md:text-5xl">CONTENT INDEX</h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/55">Published records are counted from the connected Supabase project. Drafts remain private to this workspace.</p>
    <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">{[["Organization people", people], ["Faculty members", faculty], ["Events", events]].map(([label, value], index) => <div key={String(label)} className="bg-[#111113] p-5"><p className="font-mono text-[10px] tracking-[0.14em] text-white/40">0{index + 1} / {label}</p><p className="mt-6 font-display text-4xl font-light tabular-nums text-white">{value === null ? "--" : value}</p></div>)}</div>
    <div className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-end"><div><h2 className="font-display text-2xl font-light tracking-wide text-white">Ready to publish?</h2><p className="mt-2 text-sm text-white/50">Review people, faculty, and event records before publishing.</p></div><Link href="/content" className="w-fit border border-emerald-300/60 px-4 py-2.5 text-xs font-medium tracking-[0.14em] text-emerald-200 hover:bg-emerald-300 hover:text-[#09090b]">MANAGE CONTENT</Link></div>
  </>;
}
