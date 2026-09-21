-- Cloudinary holds file bytes; this table stores only delivery and management metadata.
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  url text not null,
  resource_type text not null,
  format text,
  bytes integer,
  width integer,
  height integer,
  alt_text text,
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;
create policy "admins manage media assets" on public.media_assets for all using (public.is_cms_admin()) with check (public.is_cms_admin());
