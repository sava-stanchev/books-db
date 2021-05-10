import pool from './pool.js';

const getReviewLikeByUser = async (reviewId, userId) => {
  const sql = `
  SELECT * FROM review_likes AS r
  WHERE r.reviews_id = ? AND r.users_id = ?
  `;

  const result = await pool.query(sql, [reviewId, userId]);
  return result[0];
};

const setLikeToReview = async (userId, reviewId) => {
  const newLikeSql = `
  INSERT INTO review_likes (users_id, reviews_id, likes, dislike, is_deleted)
  VALUES (?, ?, 1 , 0, 0)
  `;
  console.log('set');
  const result = await pool.query(newLikeSql, [userId, reviewId]);
  console.log(result);

  const sql = `
  SELECT * FROM review_likes AS r
  WHERE r.review_likes_id = ?
  `;

  const newLike = (await pool.query(sql, result.insertId))[0];

  return newLike;
};

const setDislikeToReview = async (userId, reviewId) => {
  const newLikeSql = `
  INSERT INTO review_likes (users_id, reviews_id, likes, dislike, is_deleted)
  VALUES (?, ?, 0, 1, 0)
  `;
  const result = await pool.query(newLikeSql, [userId, reviewId]);

  const sql = `
  SELECT * FROM review_likes AS r
  WHERE r.review_likes_id = ?
  `;

  const newLike = (await pool.query(sql, result.insertId))[0];

  return newLike;
};


const updateReviewLike = async (reviewLikesId) => {
  const sql = `
  UPDATE review_likes AS r 
  SET r.likes = 1, r.dislike = 0
  WHERE r.review_likes_id = ?
  `;
  const result = await pool.query(sql, [reviewLikesId]);
  console.log('like');
  console.log(result);
  return result;
};

const updateReviewDislike = async (reviewLikesId) => {
  const sql = `
  UPDATE review_likes AS r 
  SET r.likes = 0, r.dislike = 1
  WHERE r.review_likes_id = ?
  `;
  const result = await pool.query(sql, [reviewLikesId]);
  console.log('dislike');
  console.log(result);
  return result;
};

const reviewLikesByBookAndUser = async (reviewId) => {
  const sql = `
  SELECT b.title, r.content, u.user_name, re.reaction
  FROM review_likes AS rl
  JOIN reviews AS r ON rl.reviews_id = r.reviews_id
  JOIN users AS u ON rl.users_id = u.users_id
  JOIN reactions AS re ON rl.reactions_id = re.reactions_id
  JOIN books AS b ON r.books_id = b.books_id
  WHERE rl.reviews_id = ?
  `;
  const result = await pool.query(sql, [reviewId]);
  return result;
};

const reviewLikesByReview = async (reviewId) => {
  console.log('Data likes');
  const sql =`
  SELECT * 
  FROM review_likes
  WHERE reviews_id = ?
  `;

  const result = await pool.query(sql, [reviewId]);
  console.log(result[0]);
  return result[0];
};

export default {
  getReviewLikeByUser,
  setLikeToReview,
  setDislikeToReview,
  updateReviewLike,
  updateReviewDislike,
  reviewLikesByBookAndUser,
  reviewLikesByReview,
};
