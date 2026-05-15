import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// export const pool = new Pool({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   port: Number(process.env.PG_PORT),
//   database: process.env.PG_DATABASE,
//   ssl: {
//     rejectUnauthorized: false,
//     // ca: process.env.PG_SSL_CA,
//   },
// });
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});