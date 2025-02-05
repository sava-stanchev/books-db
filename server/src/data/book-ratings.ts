import pool from "./pool.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const addBookRating = async (
  bookId: number,
  userId: number,
  rating: number
): Promise<void> => {
  const sql = `
    INSERT INTO book_ratings (book_id, user_id, rating) 
    VALUES (?, ?, ?)
  `;
  await pool.query<ResultSetHeader>(sql, [bookId, userId, rating]);
};

const hasUserRatedBook = async (
  userId: number,
  bookId: number
): Promise<number | null> => {
  const sql = `
    SELECT rating
    FROM book_ratings
    WHERE user_id = ? AND book_id = ?
  `;

  const [result] = await pool.query<RowDataPacket[]>(sql, [userId, bookId]);

  return result.length > 0 ? result[0].rating : null;
};

export default {
  addBookRating,
  hasUserRatedBook,
};
