create table public.group_invites (
    id uuid default gen_random_uuid() primary key,
    group_id uuid references public.groups(id) not null,
    created_by uuid references auth.users(id) not null,
    invite_code uuid default gen_random_uuid() not null unique,
    max_uses integer default 1,
    uses integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    expires_at timestamp with time zone default timezone('utc'::text, now() + interval '7 days') not null,
    is_active boolean default true
);

-- Add RLS policies
alter table public.group_invites enable row level security;

-- Anyone can view active invites
create policy "Anyone can view active invites"
    on public.group_invites for select
    using (
        is_active = true and
        expires_at > now() and
        uses < max_uses
    );

-- Only group creators can create invites
create policy "Only group creators can create invites"
    on public.group_invites for insert
    to authenticated
    with check (
        auth.uid() = (
            select created_by from public.groups where id = group_id
        )
    );

-- Create indexes for faster lookups
create index idx_group_invites_group_id on public.group_invites(group_id);
create index idx_group_invites_invite_code on public.group_invites(invite_code);
create index idx_group_invites_expires_at on public.group_invites(expires_at);