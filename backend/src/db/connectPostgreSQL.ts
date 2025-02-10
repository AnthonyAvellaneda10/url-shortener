import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT ? parseInt(DB_PORT, 10) : undefined, // Convertir a número,
  ssl: { rejectUnauthorized: false } // 🔹 Se agrega SSL para Neon
});