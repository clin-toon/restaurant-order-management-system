import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.PRODUCTION_DB,
});

export default pool;
