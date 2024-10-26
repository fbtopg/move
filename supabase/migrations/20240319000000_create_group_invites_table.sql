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

-- Add foreign key relationships explicitly
alter table public.group_invites
    add constraint fk_group_invites_groups
    foreign key (group_id)
    references public.groups(id)
    on delete cascade;

alter table public.group_invites
    add constraint fk_group_invites_users
    foreign key (created_by)
    references auth.users(id)
    on delete cascade;

-- Create view to join with profiles
create or replace view group_invites_with_details as
select 
    gi.*,
    g.name as group_name,
    g.description as group_description,
    g.image as group_image,
    p.email as inviter_email,
    p.raw_user_meta_data->>'full_name' as inviter_display_name
from group_invites gi
left join groups g on gi.group_id = g.id
left join auth.users p on gi.created_by = p.id;

-- Group members can view invites for their groups
create policy "Group members can view group invites"
    on public.group_invites for select
    to authenticated
    using (
        exists (
            select 1 from public.groups
            where id = group_invites.group_id
            and auth.uid() = any(members)
        )
    );

-- Both group creators and members can create invites
create policy "Group members and creators can create invites"
    on public.group_invites for insert
    to authenticated
    with check (
        exists (
            select 1 from public.groups
            where id = group_invites.group_id
            and auth.uid() = any(members)
        )
    );

-- Allow users to join groups through invites
create policy "Users can join groups through invites"
    on public.groups for update
    to authenticated
    using (
        exists (
            select 1 from public.group_invites
            where group_id = groups.id
            and is_active = true
            and uses < max_uses
            and expires_at > now()
        )
    )
    with check (
        -- Only allow updating the members array
        coalesce(auth.uid() = any(members), false)
    );

-- Create indexes for faster lookups
create index idx_group_invites_group_id on public.group_invites(group_id);
create index idx_group_invites_invite_code on public.group_invites(invite_code);
create index idx_group_invites_expires_at on public.group_invites(expires_at);