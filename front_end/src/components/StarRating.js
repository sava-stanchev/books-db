import { useEffect, useState } from "react";
import {FaStar} from "react-icons/fa";
import {useHistory} from "react-router-dom";

const StarRating = ({bookData: book}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(Math.round(book.average_rating));
  const [loading, setLoading] = useState(true);
  
  
useEffect(() => {
  fetch(`http://localhost:5555/books/${book.books_id}/rating`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${localStorage.getItem('token')}`
        },
      })
      .then(res => res.json())
      .then(data => setRating(data))
      .catch(console.error());
}, [book.books_id])
  


console.log(book);
console.log(averageRating);
console.log(rating);

const updateRating = (stars)=>{
  fetch(`http://localhost:5555/books/${book.books_id}/rating`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({rating: stars}),
      })
      .then(res => res.json())
      .then(() => history.go(0))
      .catch(console.error());
}
const history = useHistory();


if  (rating === null) {
  setRating(0);
}

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
              onClick={() => updateRating(ratingValue)}
            />
            <FaStar 
              className="star"
              size={25}
              color={ratingValue <= (hover || averageRating) ? "#58f" : "#343A40"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
      {
        rating?
        <p>You rated this book: {rating}</p>
        :
        <p>You still not rated this book: </p>
      }
      
      <p>Average rating: ({book.average_rating})</p>
    </div>
    
  )
}

export default StarRating;
