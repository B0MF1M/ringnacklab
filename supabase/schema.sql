-- ============================================================================
-- RingnackLab - Schema SQL para migração no Supabase (PostgreSQL)
-- Compatível 1:1 com a interface TypeScript em `data/criadouros.ts`
-- ============================================================================

create table if not exists public.criadouros (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  logo_url text,
  registro_legal text not null,
  cidade text not null,
  estado_uf char(2) not null,
  endereco text not null,
  regiao_atendimento text not null,
  telefone_whatsapp text not null,
  ativo boolean not null default true,
  destaque boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_criadouros_ativo_uf
  on public.criadouros (ativo, estado_uf, destaque desc);

-- Guias (e-books) — compatível com `data/guias.ts`
create table if not exists public.guias (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  titulo text not null,
  subtitulo text not null,
  capa_url text not null,
  topicos text[] not null default '{}',
  ordem integer not null default 1,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ofertas_guias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text not null,
  preco numeric(10,2),
  preco_original numeric(10,2),
  formato text not null,
  checkout_url text,
  plataforma text,
  cupom text,
  ativo boolean not null default true
);
