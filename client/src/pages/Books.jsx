import { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import {
  Col,
  Row,
  Button,
  InputGroup,
  Form,
  Card,
  Container,
} from "react-bootstrap";
import AuthContext from "src/utils/auth-context";
import { HOST } from "src/common/constants";
import { useNavigate } from "react-router-dom";
import Loader from "src/components/Loader";

const Books = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const booksPerPage = 6;
  const pagesVisited = pageNumber * booksPerPage;

  useEffect(() => {
    get(booksRequest);
  }, []);

  async function get(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        const result = await response.json();
        setBooks(result);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const booksRequest = new Request(`${HOST}/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, books]);

  const foundBooks = filteredBooks.slice();

  const booksRender = foundBooks
    .slice(pagesVisited, pagesVisited + booksPerPage)
    .map((book, idx) => {
      return (
        <Col key={idx} className="d-flex justify-content-center">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={book.cover} alt={book.title} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Button
                variant="primary"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });

  const pageCount = Math.ceil(foundBooks.length / booksPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center m-4">
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
      {loading && <Loader />}
      {!loading && (
        <>
          <Row xs={"auto"} sm={2} md={3} className="g-4 justify-content-center">
            {booksRender}
          </Row>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            previousLinkClassName="page-num"
            pageLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeClassName="active"
          />
        </>
      )}
    </Container>
  );
};

export default Books;
