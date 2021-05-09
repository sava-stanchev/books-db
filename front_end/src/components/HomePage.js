// import {useEffect, useState} from 'react';
// import {Button} from "react-bootstrap";
// import {useHistory} from "react-router-dom";

// const HomePage = () => {
//   const [topBooks, setTopBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`http://localhost:5555/books`, {
//       method: "GET",
//       headers: {
//         'content-type': 'application/json',
//         'authorization': `bearer ${localStorage.getItem('token')}`
//       },    
//     })
//       .then((response) => response.json())
//       .then((data) => setTopBooks(data))
//       .catch((error) => setError(error.message))
//       .finally(() => setLoading(false));
//   }, []);

//   const showError = () => {
//     if (error) {
//       return <h4><i>An error has occured: </i>{error}</h4>
//     }
//   }

//   const Loader = () => <div className="Loader"></div>;

//   const showLoader = () => {
//     if (loading) {
//       return <Loader />
//     }
//   }

//   const history = useHistory();

//   const displayBooks = topBooks.map((book) => {
//     return (
//       <div className="each-book">
//         <img className="poster" src={book.posters} alt={book.title} />
//         <b className="title">{book.title}</b>
//         <Button variant="primary" className="btn-details" onClick = {() => history.push(`/books/${book.books_id}`)}>View Details</Button>
//       </div>
//     );
//   });

//   return(
//     <div>
//       <div id="books">
//         {showLoader()}
//         {showError()}
//         <div className="content">
//           {displayBooks}
//         </div>
//       </div>
//     </div>
//   )
// };

// export default HomePage;
