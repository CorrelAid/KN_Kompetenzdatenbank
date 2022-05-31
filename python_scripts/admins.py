from dotenv import load_dotenv
import os
import sys
import json
import time
from supabase import create_client, Client

load_dotenv("../.env")

url: str = os.environ.get("VITE_SUPABASE_URL")
key: str = os.environ.get("VITE_SUPABASE_ANON_KEY")


supabase: Client = create_client(url, key)

if len(sys.argv) == 1:
    print("no arguments provided")
    sys.exit()

try:
    print(supabase.table("admin_emails").insert({"email":sys.argv[1]}).execute())
except Exception as e:
    print(e)
    
try:
    supabase.auth.sign_in(email=sys.argv[1])
except Exception as e:
    print(e)
    
        

    



