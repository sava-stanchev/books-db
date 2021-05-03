import pool from './pool.js';

const getBookRatingByUser = async (bookId, userId) => {
  // const sql = `
  //       SELECT br.book_ratings_id, br.users_id, br.books_id, r.rating
  //       FROM books_ratings AS br
  //       JOIN ratings AS r
  //       ON br.ratings_id = r.ratings_id
  //       WHERE br.books_id = ? AND br.users_id = ?
  //   `;
  const sql = `
  SELECT b.books_id, b.title, b.author, b.age_recommendation,
        b.isbn, b.publishing_year, b.print_length, b.posters,
        l.language, g.genre, b.is_deleted, b.is_borrowed, r.rating, 
        br.users_id, br.book_ratings_id (SELECT ROUND(AVG(r.rating))
                      FROM books AS b 
                      JOIN books_ratings AS br
                      ON b.books_id = br.books_id
                      JOIN ratings AS r
                      ON br.ratings_id = r.ratings_id
                      WHERE br.books_id = 2
                      ) AS average_rating
  FROM books AS b
  JOIN languages AS l
  ON b.language = l.languages_id
  JOIN genres AS g
  ON b.genre = g.genres_id
  JOIN books_ratings as br
  ON b.books_id = br.books_id
  JOIN ratings AS r
  ON br.ratings_id = r.ratings_id
  WHERE b.is_deleted != 1 and b.books_id = ? AND br.users_id = ?
`;
  const result = await pool.query(sql, [bookId, userId]);
  return result[0];
};

const setRatingToBook = async (userId, bookId, rating) => {
  const newRatingSql = `
    INSERT INTO books_ratings (users_id, books_id, ratings_id, is_deleted)
    VALUES (?, ?, ?, 0)
  `;
  const result = await pool.query(newRatingSql, [userId, bookId, rating]);

  const sql = `
        SELECT * FROM books_ratings AS br
        WHERE br.book_ratings_id = ?
    `;

  const newRating = (await pool.query(sql, result.insertId))[0];

  return newRating;
};

const updateBookRating = async (bookRatingsId, rating) => {
  const sql = `
    UPDATE books_ratings AS br 
    SET br.ratings_id = ?
    WHERE br.book_ratings_id = ?
  `;

  const result = await pool.query(sql, [rating, bookRatingsId]);
  return result;
};

export default {
  getBookRatingByUser,
  setRatingToBook,
  updateBookRating,
};
