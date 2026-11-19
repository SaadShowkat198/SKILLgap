-- ==========================================================
-- SkillGap - Supabase schema
-- Run this once in: Supabase Dashboard > SQL Editor > New query
-- ==========================================================

-- 1) Profiles: one row per authenticated user
create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text not null default '',
    email text not null default '',
    role text not null default 'student' check (role in ('student', 'jobseeker')),
    created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
    on public.profiles for select
    using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- 2) Automatically create a profile when someone signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name, email, role)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', ''),
        coalesce(new.email, ''),
        case
            when new.raw_user_meta_data ->> 'role' in ('student', 'jobseeker')
                then new.raw_user_meta_data ->> 'role'
            else 'student'
        end
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- 3) Quiz results: persisted per user (ready for the assessment history feature)
create table if not exists public.assessments (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users (id) on delete cascade,
    subject text not null,
    score integer not null check (score between 0 and 100),
    lacking_gaps jsonb not null default '[]'::jsonb,
    created_at timestamptz not null default now()
);

alter table public.assessments enable row level security;

drop policy if exists "Users can view own assessments" on public.assessments;
create policy "Users can view own assessments"
    on public.assessments for select
    using (auth.uid() = user_id);

drop policy if exists "Users can insert own assessments" on public.assessments;
create policy "Users can insert own assessments"
    on public.assessments for insert
    with check (auth.uid() = user_id);

drop policy if exists "Users can delete own assessments" on public.assessments;
create policy "Users can delete own assessments"
    on public.assessments for delete
    using (auth.uid() = user_id);
