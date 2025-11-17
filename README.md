# Online Internship Portal

A complete internship management system.

- **Backend:** Node.js (Express) + MySQL  
- **Frontend:** React + Vite  
- **Database:** SQL schema with tables, seed data, stored procedures, functions & triggers

---

## Project Structure

```
Online-internship-portal/
├── backend/
├── frontend/
├── database/
│   └── database.sql
|── README.md
└── Report.pdf
```

---

## Requirements

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MySQL server (with access to CLI or MySQL Workbench)
- (Windows) PowerShell if using the provided import helper

---

## 1. Import the MySQL database

The SQL file includes schema, sample data, procedures, functions, and triggers. Use **one** of the options below.

### Option A — PowerShell Helper (Recommended)
If you use the default local setup:

```powershell
cd C:\Users\arnav\OneDrive\Desktop\Online-internship-portal\backend
.\import-db.ps1
```
This script runs `database/database.sql` and creates the intern database.

**Note:** Update the PowerShell script or environment credentials if your MySQL password differs.

### Option B — MySQL Workbench (GUI)
1. Open MySQL Workbench
2. File → Open SQL Script → select `database/database.sql`
3. Click **Run** to execute the script

### Option C — Node Helper (uses MySQL CLI)
Requires the `mysql` CLI installed and available in your system PATH:

```powershell
cd C:\Users\arnav\OneDrive\Desktop\Online-internship-portal\backend
npm run import-db
```
This command reads DB credentials from backend/.env and executes the SQL file.

## 2. Start the Backend (Express + MySQL)

1. Open terminal / PowerShell
2. Install dependencies and start:

```powershell
cd C:\Users\arnav\OneDrive\Desktop\Online-internship-portal\backend
npm install
npm run dev
```
The backend listens on the port set in `backend/.env` (default: 3001).

**Health / Test Endpoints:**
- http://localhost:3001/ — backend status
- http://localhost:3001/api/db-test — DB connectivity test

## 3. Start the Frontend (React + Vite)
1. Open a new terminal
2. Install and start:

```powershell
cd C:\Users\arnav\OneDrive\Desktop\Online-internship-portal\frontend
npm install
npm run dev
```
Open the app at: http://localhost:5173/ (Vite may use another port if 5173 is occupied).

---

## Environment Files

**`backend/.env`** — contains DB credentials and server port:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `PORT`

Ensure these values are correct before starting the backend or using the import helper.

⚠️ **Do not commit your `.env` file to GitHub.** Add it to `.gitignore`.

---

## Useful Scripts

### Backend
- `npm run dev` — start backend in development mode
- `npm run import-db` — helper that runs `database/database.sql` via MySQL CLI (if configured)

### Frontend
- `npm run dev` — start Vite dev server

---

## Notes & Tips

- The frontend relies on stored procedures and functions defined in `database/database.sql`. Import the DB first or API calls will fail.
- `node_modules/` is intentionally excluded from the repository via `.gitignore`. Install dependencies locally with `npm install`.
- If you change DB schema or triggers, re-run the import (or apply changes manually) and restart the backend.
