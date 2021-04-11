import pool from "./pool.js";

const reviews = [];

let reviewId = 1;

const addReview = (review) => reviews.push(review);

const getAllReviews = async () => {
  return await pool.query(`
    SELECT * FROM reviews
  `);
};

const getReviewsForBook = async (id) => {
  return await pool.query(`
    SELECT content FROM books b
    JOIN reviews r
      ON b.title = r.book_title
      WHERE b.is_deleted != 1 AND b.books_id = '${id}'
  `);
};

const getReviewById = (id) => reviews.find(review => review.id === id);

// user owner check?
const updateReview = (id, reviewUpdate) => {
  const review = getReviewById(id);

  Object.keys(reviewUpdate).forEach(key => review[key] = reviewUpdate[key]);

};

const createReview = (review, createdBy) => {
  reviews.push({
    ...review,
    id: reviewId++,
    isDeleted: false,
    dateCreated: new Date()
  })

  return reviews[reviews.length - 1];
};

export default {
  addReview,
  getAllReviews,
  getReviewsForBook,
  getReviewById,
  updateReview,
  createReview
}
