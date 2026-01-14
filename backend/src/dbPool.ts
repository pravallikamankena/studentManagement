import { Pool } from "pg";

const config = {
    host: process.env.PGHOST ?? "localhost",
    port : process.env.PGPORT ? Number(process.env.PGPORT) : 5433,
    user : process.env.PGUSER ?? "postgres",
    password : process.env.PGPASSWORD ?? "postgres",
};

export const pgPool = new Pool ({
       ...config,
       database : process.env.PGDATABASE ?? "student",
});


