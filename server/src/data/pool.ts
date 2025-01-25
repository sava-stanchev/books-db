import dotenv from "dotenv";
import mysql from "mysql2/promise";

const config = dotenv.config().parsed;
if (!config) {
  throw new Error("Failed to load environment variables from .env file");
}

const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

export default pool;
