import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { schema } from "./schema/index.js";
import { Pool } from "pg";
import type { BreakingBotDb } from "../types/index.js";

// Create a PostgreSQL connection pool
const pool = new Pool({
  // Use environment variables for connection details
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.SKIP_DB_SSL_CERT_CHECK === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});

// Initialize the database by adding any missing columns
async function initializeDatabase(): Promise<void> {
  // Use a direct connection to execute the ALTER TABLE command
  // before Drizzle ORM is initialized
  const client = await pool.connect();
  try {
    // Add test_lead column to incidents table if it doesn't exist
    await client.query(
      "ALTER TABLE incidents ADD COLUMN IF NOT EXISTS test_lead TEXT;"
    );
    console.log("Database initialization complete - added test_lead column");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error; // Re-throw to prevent application startup if this fails
  } finally {
    client.release();
  }
}

// Initialize the database first, then create and export the Drizzle instance
let db: BreakingBotDb;

export const createDb = async (): Promise<BreakingBotDb> => {
  if (!db) {
    // Initialize the database before creating the Drizzle instance
    await initializeDatabase();
    db = drizzle(pool, { schema });
  }
  return db;
};
