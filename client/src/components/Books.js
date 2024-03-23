import { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import { Col, Row, Button, InputGroup, Form } from "react-bootstrap";
import AuthContext from "../providers/auth-context";
import { HOST } from "../common/constants";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const booksPerPage = 8;
  const pagesVisited = pageNumber * booksPerPage;

  useEffect(() => {
    setLoading(true);
    fetch(`${HOST}/books`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBooks(data[0]))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
      .catch(() => navigate("/500"));
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, books]);

  const foundBooks = filteredBooks.slice();

  const showError = () => {
    if (error) {
      return (
        <h4>
          <i>An error has occured: </i>
          {error}
        </h4>
      );
    }
  };

  const Loader = () => <div className="Loader"></div>;

  const showLoader = () => {
    if (loading) {
      return <Loader />;
    }
  };

  const displayBooks = foundBooks
    .slice(pagesVisited, pagesVisited + booksPerPage)
    .map((book) => {
      return (
        <div className="each-book" key={book.title}>
          <img className="poster" src={book.cover} alt={book.title} />
          <b className="title">{book.title}</b>
          <Button
            variant="primary"
            onClick={() => navigate(`/books/${book.id}`)}
          >
            View Details
          </Button>
        </div>
      );
    });

  const pageCount = Math.ceil(foundBooks.length / booksPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="bg-dark">
      <Row className="d-flex justify-content-center p-4">
        <Col className="col-md-4 col-8">
          <Form>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <div id="books">
        {showLoader()}
        {showError()}
        <div className="content">{displayBooks}</div>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Books;
