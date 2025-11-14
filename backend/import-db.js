#!/usr/bin/env node
/**
 * import-db.js
 * Helper script to import database/database.sql into MySQL using the mysql CLI.
 * Reads credentials from backend/.env and spawns the mysql CLI.
 * This script requires the `mysql` CLI to be installed and available in PATH.
 */
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const repoRoot = path.resolve(new URL('.', import.meta.url).pathname, '..');
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn('.env file not found in backend folder; ensure DB credentials are provided in environment variables.');
}

const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '3306';

const sqlFile = path.resolve(process.cwd(), '..', 'database', 'database.sql');

if (!fs.existsSync(sqlFile)) {
  console.error('database.sql not found at', sqlFile);
  process.exit(1);
}

console.log(`Importing ${sqlFile} into MySQL ${DB_HOST}:${DB_PORT} as ${DB_USER}`);

// Build mysql CLI args. Use --default-character-set to avoid encoding issues.
const args = ['-u', DB_USER, `-p${DB_PASS}`, '-h', DB_HOST, '-P', DB_PORT];

// Spawn the mysql process and pipe the SQL file into it.
const mysql = spawn('mysql', args, { stdio: ['pipe', 'inherit', 'inherit'] });

const readStream = fs.createReadStream(sqlFile);
readStream.pipe(mysql.stdin);

mysql.on('close', (code) => {
  if (code === 0) {
    console.log('Database import completed successfully.');
  } else {
    console.error(`mysql process exited with code ${code}.`);
  }
});
