import { useEffect, useState } from "react";
import {FaStar} from "react-icons/fa";
import { HOST } from '../common/constants.js'

const StarRating = ({bookData: book}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(book.average_rating);

  useEffect(() => {
    fetch(`${HOST}/books/${book.books_id}/rating`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => res.json())
    .then(data => setRating(data))
    .catch((error) => setError(error.message))
  }, [book.books_id, averageRating, rating])

  const updateRating = (stars)=>{
    fetch(`${HOST}/books/${book.books_id}/rating`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({rating: stars}),
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        window.alert(data.message)
      } else {
        setAverageRating(data.avg_rating)
      }
    })
    .catch((error) => setError(error.message))
  }

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  if  (rating === null) {
    setRating(0);
  }

  const stars = Math.round(averageRating);

  return (
    <div>
      {showError()}
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
              color={ratingValue <= (hover || stars) ? "#58f" : "#343A40"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
      {
        rating ?
        <p>You rated this book: {rating}</p>
        :
        <p>You still haven't rated this book!</p>
      }
      <p>Average rating: ({averageRating})</p>
    </div>
  )
}

export default StarRating;
