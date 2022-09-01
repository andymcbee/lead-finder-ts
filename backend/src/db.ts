
import { Pool } from 'pg';
import dotenv from "dotenv"

dotenv.config();

const { DBUSER: user, DBHOST: host, DBPASSWORD: password, DBDATABASE: database, DBPORT: port} = process.env

export const pool = new Pool({
    user,
    host,
    password,
    database,
    port: Number(port)
});

