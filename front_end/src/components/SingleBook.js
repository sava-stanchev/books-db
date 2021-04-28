import {useEffect, useState} from 'react';

const SingleBook = props => {
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const {id} = props.match.params;

  useEffect(() => {
    fetch(`http://localhost:5555/books/${id}`, { 
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setBookData(data[0]))
      .catch((error) => setError(error.message))
  }, [id]);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  if  (bookData === null) {
    return <div className="Loader"></div>;
  }

  return(
    <div>
      {showError()}
      <h1>{bookData.title}</h1>
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

};

export default SingleBook;