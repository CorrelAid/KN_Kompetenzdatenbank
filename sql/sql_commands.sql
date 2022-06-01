
CREATE TABLE public.auth_emails(
    email varchar(254) NOT NULL PRIMARY KEY UNIQUE,
    id uuid references auth.users 
);

--  TRIGGER for admins -------------------
create or replace function public.handle_new_user() 
returns trigger as $$
begin
    if new.email in (SELECT email FROM public.admin_emails) then
        insert into public.admins (id, email)
        values (new.id, new.email);
    else 
      
    end if;
    return new;
end;
$$ language plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- neccessary to access storage through python somehow
-- ALTER TABLE storage.objects OWNER TO postgres

-- -- cant run this in python somehow
-- -- create policy "Restricted Access"
-- -- on storage.objects for select
-- -- using (
-- --   bucket_id = 'images'
-- --   and auth.role() = 'authenticated'
-- -- )

-- CREATE TABLE IF NOT EXISTS main( 
--     id SERIAL NOT NULL PRIMARY KEY,
--     email varchar(254),
--     vorname varchar(100),
--     nachname varchar(100),
--     job varchar(100),
--     programming text,
--     datascience text,
--     webdev text,
--     math text,
--     other text
-- );

-- alter table main
--   enable row level security;

-- create policy "Participants data are viewable by authenticated users."
-- on main for select
-- to authenticated
-- using (
--   true
-- );

-- create or replace function get_admins()
-- returns setof uuid
-- language sql
-- security definer
-- set search_path = public
-- stable
-- as $$
--     select id
--     from public.admins
--     where id = auth.uid()
-- $$;

-- create policy "Only authenticated admins can insert and delete data"
--   on main
--   for insert with check (
--     auth.uid() in (
--       select get_admins()
--     )
--   )

-- drop function public.handle_new_user() cascade;

-- CREATE TABLE programming(
--     id int NOT NULL PRIMARY KEY,
--     r BOOLEAN NOT NULL,
--     knime BOOLEAN NOT NULL,
--     python BOOLEAN NOT NULL,
--     java BOOLEAN NOT NULL,
--     js BOOLEAN NOT NULL,
--     sql BOOLEAN NOT NULL,
--     vba BOOLEAN NOT NULL,
--     c BOOLEAN NOT NULL,
--     c_ BOOLEAN NOT NULL,
--     stata BOOLEAN NOT NULL,
--     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
-- );

-- CREATE TABLE datascience(
--     id int NOT NULL PRIMARY KEY,
--     datavis BOOLEAN NOT NULL,
--     machinelearn BOOLEAN NOT NULL,
--     nlp BOOLEAN NOT NULL,
--     deeplearn BOOLEAN NOT NULL,
--     ai BOOLEAN NOT NULL,
--     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
-- );

-- CREATE TABLE webdev(
--     id int NOT NULL PRIMARY KEY,
--     frontend BOOLEAN NOT NULL,
--     backend BOOLEAN NOT NULL,
--     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
-- );

-- CREATE TABLE math(
--     id int NOT NULL PRIMARY KEY,
--     statistics BOOLEAN NOT NULL,
--     logic BOOLEAN NOT NULL,
--     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
-- );

-- CREATE TABLE other(
--     id int NOT NULL PRIMARY KEY,
--     other varchar(200),
--     CONSTRAINT fk_id FOREIGN KEY(id) REFERENCES main(id)
-- );

-- CREATE EXTENSION citext;
-- CREATE DOMAIN email AS citext
--   CHECK ( value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$' );


-- alter table admins
--   enable row level security;

