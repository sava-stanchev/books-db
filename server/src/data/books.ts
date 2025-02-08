import { Book } from "src/types.js";
import pool from "./pool.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const getAllBooks = async (): Promise<Book[]> => {
  const sql = `
    SELECT * FROM books
    WHERE is_deleted != 1
  `;

  const [result] = await pool.query<RowDataPacket[]>(sql);
  return result as Book[];
};

const getBookById = async (id: number): Promise<Book | null> => {
  const sql = `
    SELECT 
      b.id, b.title, b.author, b.year, b.cover, b.description, 
      l.language, g.genre, b.avg_rating, b.num_ratings, b.is_deleted
    FROM books AS b
    JOIN languages AS l ON b.language = l.id
    JOIN genres AS g ON b.genre = g.id
    WHERE b.is_deleted != 1 AND b.id = ?
  `;

  const [result] = await pool.query<RowDataPacket[]>(sql, [id]);
  return result[0] ? (result[0] as Book) : null;
};

const deleteBook = async (id: number): Promise<void> => {
  const sql = `UPDATE books SET is_deleted = 1 WHERE id = ?`;
  const [result] = await pool.query<ResultSetHeader>(sql, [id]);
  if (result.affectedRows === 0) {
    throw new Error("Something went wrong when trying to delete book");
  }
};

const updateBookRating = async (id: number, rating: number): Promise<void> => {
  const sql = `
    UPDATE books
    SET 
      avg_rating = (num_ratings / (num_ratings + 1)) * avg_rating + (1 / (num_ratings + 1)) * ?,
      num_ratings = num_ratings + 1
    WHERE id = ?
  `;
  await pool.query(sql, [rating, id]);
};

export default {
  getAllBooks,
  getBookById,
  deleteBook,
  updateBookRating,
};
