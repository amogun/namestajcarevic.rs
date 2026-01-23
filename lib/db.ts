import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

// Supabase connection options:
// 1. Connection Pooler (recommended): postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
// 2. Direct connection: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
// Find these in Supabase: Settings > Database > Connection string
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL && !process.env.SUPABASE_POOLER_URL) {
  throw new Error(
    "DATABASE_URL, SUPABASE_DB_URL, or SUPABASE_POOLER_URL must be set. Please configure your Supabase database connection.",
  );
}

// Prefer pooler URL, then SUPABASE_DB_URL, then DATABASE_URL
const connectionString =
  process.env.SUPABASE_POOLER_URL ||
  process.env.SUPABASE_DB_URL ||
  process.env.DATABASE_URL!;

// Check if using pooler (port 6543) or direct connection (port 5432)
const isPooler = connectionString.includes(':6543') || connectionString.includes('pooler.supabase.com');

export const pool = new Pool({
  connectionString,
  // Connection pool settings - adjust based on connection type
  max: isPooler ? 15 : 20, // Pooler has limits
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: isPooler ? 10000 : 2000, // Pooler may need more time
  ssl: {
    rejectUnauthorized: false, // Supabase uses self-signed certificates
  },
});
export const db = drizzle(pool, { schema });