import { User } from "src/types.js";
import pool from "./pool.js";
import { RowDataPacket } from "mysql2";

const getAllUsers = async (): Promise<User[]> => {
  const sql = `
    SELECT * FROM users
    WHERE is_deleted = 0
  `;

  const [result] = await pool.query<RowDataPacket[]>(sql);
  return result as unknown as User[];
};

const getUserBy = async (
  column: keyof User,
  value: string | number
): Promise<User | null> => {
  const sql = `
    SELECT id, username, password, email, is_admin  
    FROM users
    WHERE ${pool.escapeId(column)} = ?
    AND is_deleted = 0
  `;

  const [result] = await pool.query<RowDataPacket[]>(sql, [value]);
  return (result as unknown as User[])[0] || null;
};

const createUser = async (user: User): Promise<User | null> => {
  const sqlNewUser = `
    INSERT INTO users (username, password, email, is_admin, is_deleted) 
    VALUES (?, ?, ?, 0, 0)
  `;

  const [result]: any = await pool.query(sqlNewUser, [
    user.username,
    user.password,
    user.email,
  ]);

  const sql = `
    SELECT username, email
    FROM users
    WHERE id = ?
  `;

  const [createdUser] = await pool.query<RowDataPacket[]>(sql, [
    result.insertId,
  ]);
  return (createdUser as unknown as User[])[0] || null;
};

const deleteUser = async (id: number): Promise<boolean> => {
  const sql = `
    UPDATE users 
    SET is_deleted = 1
    WHERE id = ?
  `;

  const [result]: any = await pool.query(sql, [id]);
  return result.affectedRows > 0;
};

export default {
  createUser,
  getAllUsers,
  deleteUser,
  getUserBy,
};
