import psycopg2
from dotenv import load_dotenv
import os
import json
import time
from supabase import create_client, Client

load_dotenv("../.env")

url: str = os.environ.get("VITE_SUPABASE_URL")
key: str = os.environ.get("VITE_SUPABASE_ANON_KEY")

db_pw: str = os.environ.get("DB_PW")
db_host: str = os.environ.get("DB_HOST")

supabase: Client = create_client(url, key)
conn = psycopg2.connect(user="postgres", password=db_pw, host=db_host, port="5432", database="postgres")

cur = conn.cursor()
cur.execute("""
-- ADMINS -------------------
CREATE TABLE public.admin_emails(
    email varchar(254) NOT NULL PRIMARY KEY UNIQUE
);

CREATE TABLE public.auth_roles(
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

DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;

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
    programming text,
    datascience text,
    webdev text,
    math text,
    other text
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
  )
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
)

-- -------------------   
""")

conn.commit()
cur.close()
conn.close()

            

        

