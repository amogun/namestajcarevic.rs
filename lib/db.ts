import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

// Supabase connection options:
// 1. Connection Pooler (recommended): postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
// 2. Direct connection: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
// Find these in Supabase: Settings > Database > Connection string

// Lazy initialization - only create when actually used
// This prevents build-time errors when env vars aren't available
let _pool: pg.Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

function getConnectionString(): string {
  const connectionString =
    process.env.SUPABASE_POOLER_URL ||
    process.env.SUPABASE_DB_URL ||
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL, SUPABASE_DB_URL, or SUPABASE_POOLER_URL must be set. Please configure your Supabase database connection.",
    );
  }

  return connectionString;
}

function initializePool(): pg.Pool {
  if (_pool) return _pool;

  const connectionString = getConnectionString();
  
  // Check if using pooler (port 6543) or direct connection (port 5432)
  const isPooler = connectionString.includes(':6543') || connectionString.includes('pooler.supabase.com');

  _pool = new Pool({
    connectionString,
    // Connection pool settings - adjust based on connection type
    max: isPooler ? 15 : 20, // Pooler has limits
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: isPooler ? 10000 : 2000, // Pooler may need more time
    ssl: {
      rejectUnauthorized: false, // Supabase uses self-signed certificates
    },
  });

  return _pool;
}

// Note: This file is not currently used in the codebase (using lib/storage.ts instead)
// These exports are kept for potential future use with Drizzle ORM
// Exports are lazy - only initialize when accessed, preventing build-time errors

export const pool = new Proxy({} as pg.Pool, {
  get(_target, prop) {
    return (initializePool() as any)[prop];
  },
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    if (!_db) {
      _db = drizzle(initializePool(), { schema });
    }
    return (_db as any)[prop];
  },
});