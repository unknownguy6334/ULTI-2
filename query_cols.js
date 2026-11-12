import pg from 'pg';
import fs from 'fs';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const res = await pool.query(`
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_schema = 'neon_auth' AND table_name = 'user'
`);
console.log(res.rows);
process.exit(0);
