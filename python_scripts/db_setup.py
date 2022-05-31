import psycopg2
from dotenv import load_dotenv
import os
import json
import time
from supabase import create_client, Client

load_dotenv("../.env")

url: str = os.environ.get("VITE_SUPABASE_URL")
key: str = os.environ.get("VITE_SUPABASE_ANON_KEY")
admin_emails = json.loads(os.environ.get("ADMIN_EMAILS"))
db_pw: str = os.environ.get("DB_PW")
db_host: str = os.environ.get("DB_HOST")

supabase: Client = create_client(url, key)
conn = psycopg2.connect(user="postgres", password=db_pw, host=db_host, port="5432", database="postgres")

cur = conn.cursor()
cur.execute("""
            
            
DROP TABLE IF EXISTS admin_emails;

CREATE TABLE public.admin_emails(
    email varchar(254) NOT NULL PRIMARY KEY UNIQUE
);

DROP TABLE IF EXISTS admins;

CREATE TABLE public.admins(
    email varchar(254) NOT NULL PRIMARY KEY UNIQUE,
    id uuid references auth.users 
);

--   TRIGGER
create or replace function public.handle_new_user() 
returns trigger as $$
begin
    if new.email in (SELECT email FROM public.admin_emails) then
        insert into public.admins (id, email)
        values (new.id, new.email);
    end if;
    return new;
end;
$$ language plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
--   TRIGGER




 
""")
conn.commit()
cur.close()
conn.close()


        
