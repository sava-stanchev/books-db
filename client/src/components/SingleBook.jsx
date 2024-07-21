import { useEffect, useState, useContext } from "react";
import { Button, Container, Row } from "react-bootstrap";
import AuthContext from "src/utils/auth-context";
import { HOST } from "src/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "src/components/Loader";
import StarRating from "src/components/StarRating";
import SingleBookReviews from "./SingleBookReviews";

const SingleBook = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(null);
  const [numRatings, setNumRatings] = useState(null);
  const [didUserRate, setdidUserRate] = useState(false);

  useEffect(() => {
    getBook(getBookRequest);
  }, []);

  async function getBook(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        const result = await response.json();
        setBookData(result);
        setRating(result.avg_rating);
        setNumRatings(result.num_ratings);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        navigate(`/books`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBookRequest = new Request(`${HOST}/books/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  const deleteBookRequest = new Request(`${HOST}/books/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  return (
    <Container className="my-5">
      {loading && <Loader />}
      {!loading && (
        <>
          <Row className="d-flex flex-lg-row flex-column">
            <div className="d-flex d-lg-block col-lg-4 pe-lg-5 justify-content-center mb-3 mb-lg-0">
              <img
                className="img-fluid border border-5"
                src={bookData.cover}
                alt=""
              />
            </div>
            <div className="col-lg-8 ps-lg-5">
              <div className="text-light">
                <h1>{bookData.title}</h1>
                <h3>{bookData.author}</h3>
                <h4>({bookData.year})</h4>
                <StarRating
                  value={rating}
                  rating={rating}
                  setRating={setRating}
                  numRatings={numRatings}
                  setNumRatings={setNumRatings}
                  id={id}
                  user={user}
                />
                <p>Genre: {bookData.genre}</p>
                <p>Language: {bookData.language}</p>
                <p className="book-description">{bookData.description}</p>
                {user.is_admin && (
                  <Button
                    variant="danger"
                    onClick={() => deleteBook(deleteBookRequest)}
                  >
                    Delete Book
                  </Button>
                )}
              </div>
            </div>
          </Row>
          <SingleBookReviews id={id} user={user} />
        </>
      )}
    </Container>
  );
};

export default SingleBook;
