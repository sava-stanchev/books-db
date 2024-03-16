import dotenv from "dotenv";
import mysql from "mysql2";

const config = dotenv.config().parsed;

const pool = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

export default pool;
