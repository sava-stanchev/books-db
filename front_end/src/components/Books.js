import {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {Col, Row, Button} from "react-bootstrap";
import AuthContext from '../providers/authContext';

const Books = () => {
  const auth = useContext(AuthContext);
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const booksPerPage = 8;
  const pagesVisited = pageNumber * booksPerPage;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5555/books`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
      },    
    })
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter(book => {
        return book.title.toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [search, books]);

  const foundBooks = filteredBooks.slice();

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

  const displayBooks = foundBooks
  .slice(pagesVisited, pagesVisited + booksPerPage)
  .map((book) => {
    return (
      <div className="each-book">
        <img className="poster" src={book.posters} alt={book.title} />
        <b className="title">{book.title}</b>
        <Button variant="primary" className="btn-details" onClick = {() => history.push(`/books/${book.books_id}`)}>View Details</Button>
      </div>
    );
  });

  const pageCount = Math.ceil(foundBooks.length / booksPerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  return(
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <Row>
        <Col>
            {
              auth.user.is_admin?
              <div className="btnContainer">
                <Button variant="primary" onClick={() => history.push(`/books/create`)}>
                  Create a book
                </Button>
              </div>
              :<></>
            }
        </Col>
        <Col>
        <div className="boxContainer">
          <table className = "elementsContainer">
            <tbody><tr>
              <td>
                <input type="text" placeholder="search by title" className="search" onChange={e => setSearch(e.target.value)}/>
              </td>
              <td>
                <>
                  <i className="material-icons">search</i>
                </>
              </td>
            </tr></tbody>
          </table>
        </div>
        </Col>
      </Row>
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
