import reviewsData from '../data/reviews.js';

const updateReview = async (id, reviewData) => {
    const review = await reviewsData.getReviewById(id);

    if (!review) {
      return null;
    }
  
    const updated = { ...review, ...reviewData };
    const _ = await reviewsData.updateReviewSQL(updated);
  
    return updated;
};

export default {
    updateReview
}
