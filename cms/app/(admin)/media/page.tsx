import { MediaUpload } from "@/components/media-upload";

export default function Media() {
  return <><p className="font-mono text-[11px] tracking-[0.2em] text-emerald-300">ASSETS / MEDIA</p><h1 className="mt-3 font-display text-4xl font-light tracking-wide text-white">MEDIA LIBRARY</h1><section className="mt-10 max-w-2xl border border-dashed border-white/25 bg-[#111113] p-8"><h2 className="font-display text-xl font-light tracking-wide text-white">Cloudinary upload</h2><p className="mt-3 text-sm leading-6 text-white/55">Files are uploaded server-side to Cloudinary. Their delivery URL and metadata are saved to shared Supabase Postgres through Prisma.</p><MediaUpload /></section></>;
}
