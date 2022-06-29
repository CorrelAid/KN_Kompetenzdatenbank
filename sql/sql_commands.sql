-- ADMINS -------------------
CREATE TABLE IF NOT EXISTS public.admin_emails(
    email varchar(254) NOT NULL PRIMARY KEY UNIQUE
);

CREATE TABLE IF NOT EXISTS public.auth_roles(
    email varchar(254) NOT NULL PRIMARY KEY UNIQUE,
    admin boolean NOT NULL,
    id uuid references auth.users
);

--  TRIGGER for auth roles -------------------
create or replace function public.handle_new_user() 
returns trigger as $$
begin
    if new.email in (SELECT email FROM public.admin_emails) then
        insert into public.auth_roles (id, email, admin)
        values (new.id, new.email, TRUE);
    else
      insert into public.auth_roles (id, email, admin)
        values (new.id, new.email, FALSE);
    end if;
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
  
-- -------------------

-- MAIN -------------------
CREATE TABLE IF NOT EXISTS main( 
    id SERIAL NOT NULL PRIMARY KEY,
    email varchar(254),
    vorname varchar(100),
    nachname varchar(100),
    job varchar(100),
    attendance text,
    skills text,
    confirmed boolean NOT NULL
);

alter table main
  enable row level security;

create policy "Participants data are viewable by authenticated users."
on main for select
to authenticated
using (
  true
);

create or replace function get_admins()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
    select id
    from public.auth_roles
    where id = auth.uid() AND admin = TRUE
$$;

create policy "Only authenticated admins can insert data"
  on main
  for insert with check (
    auth.uid() in (
      select get_admins()
    )
  );
  
  create policy "Only authenticated admins can delete data"
  on main
  for delete with check (
    auth.uid() in (
      select get_admins()
    )
  );
  
create or replace function delete_all() returns VOID as $$
  truncate main
$$ language sql;

create policy list_all_buckets
on storage.buckets for select using (
true
);

-- STORAGE -------------------
insert into storage.buckets (id, name)
values ('pictures', 'pictures');

DROP POLICY IF EXISTS p1 ON storage.objects CASCADE;

create policy p1
on storage.objects for select
using (
  bucket_id = 'pictures'
  and auth.role() = 'authenticated'
);

create policy p2
on storage.objects for insert
with check (
     auth.uid() in (
       select get_admins()
     )
);

create policy p3
on storage.objects for update
using (
  bucket_id = 'pictures'
  and auth.role() = 'authenticated'
);

create policy p4
on storage.objects for delete
using (
  bucket_id = 'pictures'
  and auth.role() = 'authenticated'
)