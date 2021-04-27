// import { useState } from 'react';
// import reviewsData from '../data/reviews.js';
// import Reviews from './Reviews.js';

// const ReviewsForApp = () => {
  // const [reviews, setReviews] = useState(reviewsData);

  // const removeReview = (reviews_id) => {
  //   setReviews(prevReviews => prevReviews.filter(r => r.reviews_id !== reviews_id));
  // }

  // const updateReview = (reviews_id, reviewData) => {
  //   const index = reviews.findIndex(r => r.reviews_id === reviews_id);
  //   const copy = [...reviews];

  //   copy[index] = {...copy[index], ...reviewData};
  //   setReviews(copy);
  // }

  // return(
  //   <div className="App">
  //   {reviews.map((r) => {
  //       return (
  //         <Reviews
  //           {...r}
  //           // update={(updateData) => updateReview(r.reviews_id, updateData)} 
  //           // remove={() => removeReview(r.reviews_id)}
  //           // key={r.reviews_id}
  //         />
  //       );
  //     })}
  //   </div>
  // )
// }

// export default ReviewsForApp;
