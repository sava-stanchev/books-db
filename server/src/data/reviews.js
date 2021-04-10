import pool from "./pool.js";

const reviews = [];

let reviewId = 1;

export const addReview = (review) => reviews.push(review);

export const getAllReviews = async () => {
  return await pool.query(`
    SELECT * FROM reviews
  `);
};

export const getReviewsForBook = async (id) => {
  return await pool.query(`
    SELECT content FROM books b
    JOIN reviews r
      ON b.title = r.book_title
      WHERE b.is_deleted != 1 AND b.books_id = '${id}'
  `);
};

export const getReviewById = (id) => reviews.find(review => review.id === id);

// user owner check?
export const updateReview = (id, reviewUpdate) => {
  const review = getReviewById(id);

  Object.keys(reviewUpdate).forEach(key => review[key] = reviewUpdate[key]);

};

export const createReview = (review, createdBy) => {
  reviews.push({
    ...review,
    id: reviewId++,
    isDeleted: false,
    dateCreated: new Date()
  })

  return reviews[reviews.length - 1];
};