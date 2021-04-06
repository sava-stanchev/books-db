const reviews = [];

let reviewId = 1;

export const addReview = (review) => reviews.push(review);

//export const getAllBooks = () => books;

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