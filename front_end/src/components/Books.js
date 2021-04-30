import {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ReactPaginate from "react-paginate";

const Books = () => {
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const booksPerPage = 8;
  const pagesVisited = pageNumber * booksPerPage;

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5555/books`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const showError = () => {
    if (error) {
      return <h4><i>An error has occured: </i>{error}</h4>
    }
  }

  const Loader = () => <div className="Loader"></div>;

  const showLoader = () => {
    if (loading) {
      return <Loader />
    }
  }

  const history = useHistory();

  const displayBooks = books
  .slice(pagesVisited, pagesVisited + booksPerPage)
  .map((book) => {
    return (
      <div id='BookContainer' className='mouse_over'>
      <img src={book.posters} alt={book.title}/>
      <h2>
        {book.title}
        <br/>
        {book.author}
        <br/>
        {book.publishing_year}
      </h2>
      <button type="button" className="book-details-link" onClick = {() => history.push(`/books/${book.books_id}`)}>View Details</button>
    </div>
    );
  });

  const pageCount = Math.ceil(books.length / booksPerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  return(
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <div className="boxContainer">
        <table className = "elementsContainer">
          <tbody><tr>
            <td>
              <input type="text" placeholder="Search"
              className="search"/>
            </td>
            <td>
              <a href="#">
                <i className="material-icons">search</i>
              </a>
            </td>
          </tr></tbody>
        </table>
      </div>
      <div id="books">
        {showLoader()}
        {showError()}
        <div className="content">
          {displayBooks}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  )
};

export default Books;
