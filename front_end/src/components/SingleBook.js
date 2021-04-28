import {useEffect, useState} from 'react';
// import {useHistory} from "react-router-dom";

const SingleBook = props => {
  const [bookData, setBookData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const {id} = props.match.params;
  console.log(id);

  useEffect(() => {
<<<<<<< HEAD
      fetch(`http://localhost:5555/books/${id}`,
      { method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => setBook(data));
      .then((data) => setBookData(data))
     // .catch((error) => setError(error.message))
     // .finally(() => setLoading(false));
  }, [id]);

  // const showError = () => {
  //   if (error) {
  //     return <h4><i>An error has occured: </i>{error}</h4>
  //   }
  // }

  // const Loader = () => <div className="Loader"></div>;

  // const showLoader = () => {
  //   if (loading) {
  //     return <Loader />
  //   }
  // }

  // const history = useHistory();
 
  console.log(bookData[0]);

  return(
    <div>
      <h1>hi</h1>
    </div>
  )
  //   <div className="App">
      
  //       <div id="book">
  //         <h1>Title: {book.title}, Author: {book.author}</h1>
  //         <div className="content-detailed">
  //           <div className="book-detailed">
  //             <div className="book-image-detailed">
  //               <img src="${book.images.original.url}"/>
  //             </div>
  //             <div className="book-info">
  //               <p>Publishing Year: {book.publishing_year}</p>
  //               <p>Genre: {book.genre}</p>
  //               <p>Age Recommendation: {book.age_recommendation}</p>
  //               <p>ISBN: {book.isbn}</p>
  //               <p>Language: {book.language}</p>
  //               <p>Print Length: {book.print_length}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
      
  //   </div>
  // )
>>>>>>> 8a19ade45d8f2176f6e3baa93e34a2e116443762
};

export default SingleBook;