# Intern Portal — local setup

This repository contains a backend (Express + MySQL) and a frontend (React + Vite).

Quick steps to get the project running locally:

1. Import the database (creates schema, seed data, procedures, functions and triggers)

- If you have MySQL CLI available and your root password is `123456` (as on this machine), open PowerShell and run:

```powershell
cd C:\Users\arnav\OneDrive\Desktop\intern-portal\backend
.\import-db.ps1
```

This will run the SQL file located at `database/database.sql` and create the `intern` database with all procedures and triggers.

If you prefer to use MySQL Workbench, open `database/database.sql` and run the script inside Workbench.

- Or (alternative) run the Node helper from the `backend` folder which calls the `mysql` CLI (reads credentials from `backend/.env`):

```powershell
cd 'C:\Users\arnav\OneDrive\Desktop\intern-portal\backend'
npm run import-db
```

This requires the `mysql` CLI installed and in PATH. The helper is more robust than trying to parse DELIMITER statements in JS.

2. Start the backend

```powershell
cd C:\Users\arnav\OneDrive\Desktop\intern-portal\backend
npm install
npm run dev
```

Backend runs on port defined in `backend/.env` (default: 3001). Verify DB connection:

- http://localhost:3001/ should return a simple status message.
- http://localhost:3001/api/db-test checks DB connectivity.

3. Start the frontend

```powershell
cd C:\Users\arnav\OneDrive\Desktop\intern-portal\frontend
npm install
npm run dev
```

Open the app at http://localhost:5173/ (Vite may choose a nearby port if 5173 is busy).

Notes
- The frontend now includes a fallback stylesheet link in `frontend/index.html` so styles are visible even before JS bundles load.
- The backend controllers call MySQL stored procedures and functions defined in `database/database.sql`. Ensure you run the SQL import before using the frontend features.

If you want, I can also:
- Add a small Node.js script to import the SQL (instead of using the CLI),
- Convert the UI to use Tailwind or a component library,
- Add tests or demo data pages.

Tell me which next step you'd like me to take (import DB now, run a test endpoint, or further improve UI).