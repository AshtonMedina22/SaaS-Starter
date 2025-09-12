import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// For Supabase, we need to use the pooler connection string
const connectionString = process.env.POSTGRES_URL || 'postgresql://postgres:Papa$Frita$22@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
