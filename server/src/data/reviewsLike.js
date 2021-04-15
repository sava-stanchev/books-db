import pool from './pool.js';

const getReviewLikeByUser = async (reviewId, userId) => {
  const sql = `
  SELECT * FROM review_likes AS r
  WHERE r.reviews_id = ? AND r.users_id = ?
  `;

  const result = await pool.query(sql, [reviewId, userId]);
  return result[0];
};

const setLikeToReview = async (userId, reviewId, reaction) => {
  const newLikeSql = `
  INSERT INTO review_likes (users_id, reviews_id, reactions_id, is_deleted)
  VALUES (?, ?, ?, 0)
  `;
  const result = await pool.query(newLikeSql, [userId, reviewId, reaction]);

  const sql = `
  SELECT * FROM review_likes AS r
  WHERE r.review_likes_id = ?
  `;

  const newLike = (await pool.query(sql, result.insertId))[0];

  return newLike;
};

const updateReviewLike = async (reviewLikesId, reaction) => {
  const sql = `
  UPDATE review_likes AS r 
  SET r.reactions_id = ?
  WHERE r.review_likes_id = ?
  `;
  const result = await pool.query(sql, [reaction, reviewLikesId]);
  return result;
};

export default {
  getReviewLikeByUser,
  setLikeToReview,
  updateReviewLike,
}