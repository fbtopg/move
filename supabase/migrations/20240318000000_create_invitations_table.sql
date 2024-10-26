create table public.invitations (
    id uuid default gen_random_uuid() primary key,
    sender_id uuid references auth.users(id) not null,
    email varchar(255) not null,
    invite_code uuid default gen_random_uuid() not null unique,
    group_id uuid references public.groups(id) not null,
    status varchar(20) default 'pending' check (status in ('pending', 'accepted', 'expired')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    expires_at timestamp with time zone default timezone('utc'::text, now() + interval '7 days') not null
);

-- Add RLS policies
alter table public.invitations enable row level security;

-- Sender can view their sent invitations
create policy "Users can view invitations they sent"
    on public.invitations for select
    to authenticated
    using (auth.uid() = sender_id);

-- Sender can create invitations
create policy "Users can create invitations"
    on public.invitations for insert
    to authenticated
    with check (auth.uid() = sender_id);

-- Create index for faster lookups
create index idx_invitations_email on public.invitations(email);
create index idx_invitations_invite_code on public.invitations(invite_code);