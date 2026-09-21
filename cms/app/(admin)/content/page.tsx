import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Row = { id: string; name?: string; title?: string; status: string; updatedAt: Date };
async function rows() {
  try {
    const [people, faculty, events] = await Promise.all([
      prisma.organizationPerson.findMany({ select: { id: true, name: true, status: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: 8 }),
      prisma.facultyMember.findMany({ select: { id: true, name: true, status: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: 8 }),
      prisma.event.findMany({ select: { id: true, title: true, status: true, updatedAt: true }, orderBy: { updatedAt: "desc" }, take: 8 }),
    ]);
    return [people, faculty, events] as [Row[], Row[], Row[]];
  } catch { return [[], [], []] as [Row[], Row[], Row[]]; }
}

export default async function Content() {
  const [people, faculty, events] = await rows();
  const groups = [["Organization people", people, "/content/people", "MANAGE PEOPLE"], ["Faculty", faculty, "/content/faculty", "MANAGE FACULTY"], ["Events", events, "/content/events", "MANAGE EVENTS"]] as const;
  return <><p className="font-mono text-[11px] tracking-[0.2em] text-emerald-300">PUBLISHING / CONTENT</p><h1 className="mt-3 font-display text-4xl font-light tracking-wide text-white">PUBLIC RECORDS</h1><p className="mt-4 text-sm text-white/55">Only records marked published are available to the public website.</p>
  <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-3">{groups.map(([title, items, href, label], index) => <section key={title} className="bg-[#111113]"><div className="flex items-center justify-between border-b border-white/10 p-5"><h2 className="font-display text-lg font-light tracking-wide text-white">{title}</h2><span className="font-mono text-xs text-emerald-200">0{index + 1} / {items.length}</span></div><div className="divide-y divide-white/10">{items.length ? items.map((item) => <div key={item.id} className="p-5"><p className="text-sm font-medium text-white">{item.name ?? item.title}</p><p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-white/40">{item.status}</p></div>) : <p className="p-5 text-sm text-white/45">No records yet.</p>}</div><Link href={href} className="block border-t border-white/10 p-5 text-xs font-medium tracking-[0.12em] text-emerald-200 hover:bg-white/[0.04]">{label}</Link></section>)}</div>
  <p className="mt-7 text-sm text-white/50">Apply the supplied migration before connecting the content editor rollout. <Link href="/settings" className="font-medium text-emerald-200 underline underline-offset-4">Review setup</Link>.</p></>;
}
