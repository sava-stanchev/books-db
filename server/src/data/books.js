import pool from "./pool.js";

const getAllBooks = async () => {
  const sql = `
    SELECT * FROM books
    WHERE is_deleted != 1
  `;

  const [result] = await pool.query(sql);
  return result;
};

const sortBooksByYear = async (sortOrder) => {
  let orderClause;
  if (sortOrder === "year_asc") {
    orderClause = "ORDER BY year ASC";
  } else if (sortOrder === "year_desc") {
    orderClause = "ORDER BY year DESC";
  } else {
    throw new Error("Invalid sort order");
  }

  const sql = `
    SELECT * FROM books
    WHERE is_deleted != 1
    ${orderClause}
  `;

  const [result] = await pool.query(sql);
  return result;
};

const getBookById = async (id) => {
  const sql = `
    SELECT 
      b.id, b.title, b.author, b.year, b.cover, b.description, 
      l.language, g.genre, b.avg_rating, b.num_ratings, b.is_deleted
    FROM books AS b
    JOIN languages AS l ON b.language = l.id
    JOIN genres AS g ON b.genre = g.id
    WHERE b.is_deleted != 1 AND b.id = ?
  `;

  const [result] = await pool.query(sql, [id]);
  return result;
};

const deleteBook = async (id) => {
  const sql = `
    UPDATE books
    SET is_deleted = 1
    WHERE id = ?
  `;

  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
};

const updateBookRating = async (id, rating) => {
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
  sortBooksByYear,
  getBookById,
  deleteBook,
  updateBookRating,
};
