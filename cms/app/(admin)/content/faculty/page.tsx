import Link from "next/link";
import { saveFaculty } from "@/actions/people";
import { CloudinaryAssetField } from "@/components/content/cloudinary-asset-field";

const input = "mt-2 w-full border border-white/15 bg-[#09090b] px-3 py-2.5 text-sm text-white focus:border-emerald-300";

export default function FacultyEditor() {
  return <><Link href="/content" className="text-xs font-medium tracking-[0.12em] text-emerald-200 hover:text-white">BACK TO CONTENT</Link><p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-emerald-300">FACULTY / DIRECTORY</p><h1 className="mt-3 font-display text-4xl font-light tracking-wide text-white">ADD A PROFESSOR</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">Faculty profiles appear in the public directory only after they are published.</p>
  <form action={saveFaculty} className="mt-10 grid max-w-4xl gap-5 border border-white/10 bg-[#111113] p-5 md:grid-cols-2 md:p-7"><label className="text-xs font-medium tracking-[0.12em] text-white/70">FULL NAME<input required name="name" className={input} /></label><label className="text-xs font-medium tracking-[0.12em] text-white/70">DEPARTMENT<input required name="department" defaultValue="College of Computer Studies" className={input} /></label><label className="text-xs font-medium tracking-[0.12em] text-white/70">DISPLAY ORDER<input name="displayOrder" type="number" min="0" defaultValue="0" className={input} /></label><label className="text-xs font-medium tracking-[0.12em] text-white/70">STATUS<select name="status" className={input}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label><div className="md:col-span-2"><CloudinaryAssetField name="imageUrl" label="PORTRAIT" /></div><button className="w-fit border border-emerald-300/60 px-4 py-2.5 text-xs font-medium tracking-[0.14em] text-emerald-200 hover:bg-emerald-300 hover:text-[#09090b]">SAVE PROFESSOR</button></form></>;
}
