import { useState } from 'react';
import reviewsData from '../data/reviews.js';
import Reviews from './Reviews.js';

const ReviewsForApp = () => {
    const [reviews, setReviews] = useState(reviewsData);

    const removeReview = (reviews_id) => {
        setReviews(prevReviews => prevReviews.filter(r => r.reviews_id !== reviews_id));
    }

    return(
        <div className="App">
            {reviews && reviews.map(r => (
                <div>
                    <Reviews {...r} removeReview={removeReview} key={r.reviews_id} />
                </div>
            ))}
        </div>
    )
}

export default ReviewsForApp;
