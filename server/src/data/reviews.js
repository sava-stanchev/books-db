import pool from "./pool.js";
import booksData from '../data/books.js'

const addReview = async (req) => {
  console.log(req);
  const book = await booksData.getBookById();
};

const getAllReviews = async () => {
  return await pool.query(`
    SELECT * FROM reviews
  `);
};

const getReviewsForBook = async (id) => {
  return await pool.query(`
    SELECT content FROM books AS b
    JOIN reviews AS r
      ON b.books_id = r.books_id
      WHERE b.is_deleted != 1 AND b.books_id = '${id}'
  `);
};

const getReviewById = (id) => reviews.find(review => review.id === id);

// user owner check?
const updateReview = (id, reviewUpdate) => {
  const review = getReviewById(id);

  Object.keys(reviewUpdate).forEach(key => review[key] = reviewUpdate[key]);

};

const createReview = async (review, createdBy) => {
  const {
    users_id,
    books_id,
    date_created,
    is_deleted,
    content
  } = review;
  
  const sqlNewReview = `
  INSERT INTO reviews (users_id, books_id, date_created, is_deleted, content)
  VALUES (?, ?, ? , ?, ?)
  `;
  const result = await pool.query(sqlNewReview, [users_id, books_id, date_created, is_deleted, content]);
  const sql = `SELECT * FROM reviews AS r
              WHERE r.reviews_id = ?
`;
  const createdReview = (await pool.query(sql, [result.insertId]))[0];

  return {
    success: true,
    response: createdReview
  };
};

export default {
  addReview,
  getAllReviews,
  getReviewsForBook,
  getReviewById,
  updateReview,
  createReview
}