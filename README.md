# Kompetenzdatenbank

App to use during hackathons. Serves the purpose of providing an overview of participants to simplify the creation of project teams.

The code is a complete mess, will try to clean it up for future hackathons.


## Development Instructions

### 1. Set up a Supabase project

- follow [this tutorial](https://onebite.dev/setting-up-new-supabase-project/)

### 2. Configure database

Open the SQL editor and click on "New Query". Paste the contents "sql/sql_commands.sql" and run the query.

### 3. Edit E-Mail templates

Copy and Paste E-Mail templates into supabase

### 3. Clone project

```
git clone git@github.com:CorrelAid/KN_Kompetenzdatenbank.git
cd KN_Kompetenzdatenbank
```

### 3. Create .env
e.g.:
```
cp example_env.txt .env
```
Edit the file and follow the instructions provided above the variables.

### 4. Set up project
```
npm install
```

### 5. Set up python environment to be able run scripts
```
cd python_scripts
python -m venv env
source env/bin/activate
python -m pip install -r requirements.txt
```

## 6. Add at least one admin to be able to access database
```
python admins.py example@mail.com
```

### 7. Run project
While in root folder:
```
npm run dev
```

## GUI instructions

### 1. Add data

## Ideal procedure during hackathon

You can use this app to check if someone is registered and then confirm their entry in the database. Because there are different types of attendance, ask people if they plan to actively participate. Only then would it make sense for them to show up in the database probably.

## Deploy 

### 1.  Deploying to Render 

Follow the [Official Instructions](https://render.com/docs/deploy-sveltekit) and add .env contents 

## Project Infos
### Authentication mechanism
Authentication happens through [magic links](https://supabase.com/docs/guides/auth/auth-magic-link). Only admins and confirmed participants can request links. Admins need to be added with the python script "python_scripts/admins.py". This script adds an email to the table "admin_emails" and sends an inivitation link. If a users e-mail exists in the table "admin_emails" a trigger causes the user to be added to the "auth_role" table with the value "true" for "admin". The same trigger will set "admin" to "false" if regular users (not in "admin_email" table) get added to the authentication table. Participants can request magic links if they are in the table "main" and "confirmed" is set to "true". Admins can confirm users through the GUI.

### How is the data upload handled?
Administrators can upload data using the GUI by opening the corresponding modal. In the background, the csv is transformed with the function transform_array() (you can find it in src/lib/data_processing.js). This creates an array using the column indexes of the uploaded csv. 


## Todo
- e is undefined when uploading pics
- fix:
```
node:internal/errors:465
    ErrorCaptureStackTrace(err);
    ^

TypeError [ERR_INVALID_URL]: Invalid URL
    at new NodeError (node:internal/errors:372:5)
    at URL.onParseError (node:internal/url:553:9)
    at new URL (node:internal/url:629:5)
    at new Request (file:///home/jstet/Gits/CorrelAid/Kompetenzdatenbank/node_modules/@sveltejs/kit/dist/install-fetch.js:5907:16)
    at file:///home/jstet/Gits/CorrelAid/Kompetenzdatenbank/node_modules/@sveltejs/kit/dist/install-fetch.js:6189:19
    at new Promise (<anonymous>)
    at fetch (file:///home/jstet/Gits/CorrelAid/Kompetenzdatenbank/node_modules/@sveltejs/kit/dist/install-fetch.js:6187:9)
    at setServerSession (/src/lib/auth.js:44:8)
    at Module.setAuthCookie (/src/lib/auth.js:53:8)
    at eval (/src/routes/__layout.svelte:32:33) {
  input: '/auth',
  code: 'ERR_INVALID_URL'
}

```
  - possible fix: https://kit.svelte.dev/docs/routing (try different api routes)

- Fix long loading times when loading table row components (Entries). I have no idea why that happens. I had to switch search functionalities to vanilla js because of that
  - 10s without pics
  - 13s with pics



## Long term development goals

- Send invitation e-mails from custom e-mail instead of supabase mail (use some mail api, e.g. [Googles](https://developers.google.com/gmail/api/quickstart/nodejs))
- add feature to delete/add/change entry
- responsive admin area
- add more (and better) error handling
- clean up this shitty code
