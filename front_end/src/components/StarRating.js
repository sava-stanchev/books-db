import { useEffect, useState } from "react";
import {FaStar} from "react-icons/fa";

const StarRating = ({bookData: book}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  // get book rating from user
useEffect(() =>{
  fetch(`http://localhost:5555/books/${book.id}/rating`, {
    method: 'GET',
  })
  .then((res)=>res.json())
  .then((data) => setRating(data))
  .catch(console.error());
}, []);

//update book rating from user
useEffect(() =>{
  fetch(`http://localhost:5555/books/${book.id}/rating`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(rating),
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(console.error());
}, [rating]);

// get average rating for book
  useEffect(() =>{
    fetch(`http://localhost:5555/books/${book.id}/rating`, {
      method: 'PATCH',
    })
    .then(res => res.json())
    .then(data => setAverageRating(data))
    .catch(console.error());
  }, [rating]);

  

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
              color={ratingValue <= (hover || rating) ? "#58f" : "#343A40"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
      <p>{rating}</p>
      <p> Average rating: ({averageRating})</p>
    </div>
  )
}

export default StarRating;
