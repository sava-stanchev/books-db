import { useEffect, useState } from "react";
import {FaStar} from "react-icons/fa";

const StarRating = ({bookData: book}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  
  // get book rating from user
  useEffect(() =>{
  //console.log('from star rating ')
  //console.log(book);
  fetch(`http://localhost:5555/books/${book.books_id}/rating`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem('token')}`
    },
  })
  .then((res) => res.json())
  .then((data) => setRating(data.rating))
  .catch(console.error());
}, [book.books_id]);


// console.log(averageRating);

//update book rating from user
// useEffect(() =>{
//   fetch(`http://localhost:5555/books/${book.biioks_id}/rating`, {
//     method: 'PUT',
//     headers: {
//       'content-type': 'application/json',
//     },
//     body: JSON.stringify(rating),
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(console.error());
// }, [rating]);

// get average rating for book
  // useEffect(() =>{
  //   fetch(`http://localhost:5555/books/${book.books_id}/rating`, {
  //     method: 'PATCH',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `bearer ${localStorage.getItem('token')}`
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(data => setAverageRating(data))
  //   .catch(console.error());
  // }, [rating]);

  // if  (averageRating === null) {
  //   return <div className="Loader"></div>;
  // }  

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
      <p>Average rating: ({averageRating})</p>
    </div>
  )
}

export default StarRating;
