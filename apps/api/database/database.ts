import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});

if (!process.env.DB_URL) {
  throw new Error(
    'DB_URL is not defined. Check your .env file or dotenv path.'
  );
}

export const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export const db = drizzle(pool);
