import { TokenPayload } from "src/types";
import pool from "./pool";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const addToken = async (token: string): Promise<boolean> => {
  const sql = `INSERT INTO tokens (token) VALUES (?)`;
  const [result] = await pool.query<ResultSetHeader>(sql, [token]);
  return result.affectedRows > 0;
};

const getToken = async (token: string): Promise<TokenPayload | null> => {
  const sql = `SELECT * FROM tokens WHERE token = ?`;
  const [result] = await pool.query<RowDataPacket[]>(sql, [token]);
  return (result as TokenPayload[])[0] || null;
};

const removeToken = async (token: string): Promise<boolean> => {
  const sql = `DELETE FROM tokens WHERE token = ?`;
  const [result] = await pool.query<ResultSetHeader>(sql, [token]);
  return result.affectedRows > 0;
};

export default {
  addToken,
  getToken,
  removeToken,
};
