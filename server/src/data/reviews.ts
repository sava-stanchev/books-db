import pool from "./pool.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Review } from "src/types.js";

const getReviewsForBook = async (id: number): Promise<Review[]> => {
  const sql = `
    SELECT r.content, r.date_created, u.username, r.id, r.user_id
    FROM reviews AS r
    LEFT JOIN books AS b ON b.id = r.book_id
    LEFT JOIN users AS u ON u.id = r.user_id
    WHERE r.is_deleted != 1 AND b.id = ?
    GROUP BY r.id
  `;

  const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
  return result as Review[];
};

const getReviewById = async (id: number): Promise<Review> => {
  const sql = `SELECT * FROM reviews WHERE id = ?`;
  const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
  return result[0] as Review;
};

const createReview = async (
  bookId: number,
  content: string,
  userId: number
): Promise<Review> => {
  const sqlNewReview = `
    INSERT INTO reviews (user_id, book_id, date_created, is_deleted, content)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query<ResultSetHeader>(sqlNewReview, [
    userId,
    bookId,
    new Date(),
    0,
    content,
  ]);

  const sql = `SELECT content, date_created FROM reviews WHERE id = ?`;
  const [createdReview] = await pool.query<RowDataPacket[]>(sql, [
    result.insertId,
  ]);
  return createdReview[0] as Review;
};

const editReview = async (id: number, content: string): Promise<boolean> => {
  const sql = `UPDATE reviews SET content = ? WHERE id = ?`;
  const [result] = await pool.query<ResultSetHeader>(sql, [content, id]);
  return result.affectedRows > 0;
};

const deleteReview = async (id: number): Promise<boolean> => {
  const sql = `UPDATE reviews SET is_deleted = 1 WHERE id = ?`;
  const [result] = await pool.query<ResultSetHeader>(sql, [id]);
  return result.affectedRows > 0;
};

export default {
  getReviewsForBook,
  getReviewById,
  createReview,
  editReview,
  deleteReview,
};
