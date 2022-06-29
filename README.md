# Kompetenzdatenbank

App to use during hackathons. Serves the purpose of providing an overview of participants to simplify the creation of project teams.

[WIP URL](https://kompetenzdatenbank.onrender.com/) 


## Development Instructions

### 1. Set up a Supabase project

- follow [this tutorial](https://onebite.dev/setting-up-new-supabase-project/)

### 2. Configure database

Open the SQL editor and click on "New Query". Paste the contents "sql/sql_commands.sql" and run the query.

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


## Deploy 

### 1.  Deploying to Render 

Follow the [Official Instructions](https://render.com/docs/deploy-sveltekit) and add .env contents 


## Todo

- handle weird writing of programming languae "C / C++"
- add more error handling
- add feature to delete/add/change entry
- add feature that allows admins to confirm participants
- deal with https://supabase.com/docs/guides/platform/permissions

## Long term development goals

- Send invitation e-mails from custom e-mail instead of supabase mail (use some mail api, e.g. [Googles](https://developers.google.com/gmail/api/quickstart/nodejs))

