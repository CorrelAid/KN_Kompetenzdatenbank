from storage3 import create_client
from dotenv import load_dotenv
import os

load_dotenv("../.env")

url: str = os.environ.get("STORAGE_URL")
key: str = os.environ.get("VITE_SUPABASE_ANON_KEY")

headers = {"apiKey": key, "Authorization": f"Bearer {key}"}

supabase = create_client(url, headers, is_async=False)

supabase.create_bucket("")

print(supabase.list_buckets())