import { useState } from "react";
import {FaStar} from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return ( 
          <label>
            <input 
              type="radio" 
              name="rating" 
              value={ratingValue} 
              onClick={() => setRating(ratingValue)}
            />
            <FaStar 
              className="star"
              size={25}
              color={ratingValue <= (hover || rating) ? "#58f" : "#343A40"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
      <p>You rated this book: {rating}</p>
      <p>Average rating: ({})</p>
    </div>
  )
}

export default StarRating;
