import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HOST } from "src/common/constants";
import Loader from "src/components/Loader";
import Search from "src/components/Search";

const Books = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");

  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${HOST}/books`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const displayedBooks = filteredBooks.slice(
    pageNumber * booksPerPage,
    (pageNumber + 1) * booksPerPage
  );

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handlePageChange = ({ selected }) => setPageNumber(selected);

  return (
    <Container>
      <Search search={search} onSearchChange={handleSearchChange} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row xs={1} sm={2} md={3} className="g-4 justify-content-center">
            {displayedBooks.map((book) => (
              <Col key={book.id} className="d-flex justify-content-center">
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
            ))}
          </Row>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
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