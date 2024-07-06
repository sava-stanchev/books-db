import { useEffect, useState, useContext } from "react";
import { Button, Container, Row } from "react-bootstrap";
// import SingleBookReviews from "./SingleBookReviews.js";
import AuthContext from "../utils/auth-context.js";
import { HOST } from "../common/constants.js";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import StarRating from "./StarRating";

const SingleBook = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  // const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(3);

  // useEffect(() => {
  //   const userId = { userId: auth.user.users_id };
  //   fetch(`${HOST}/reviews/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(userId),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setReview(data))
  //     .catch(() => navigate("/500"));
  // }, [id, auth.user.users_id, bookData]);

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
        setBookData(result[0]);
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
        <Row>
          <div className="col-4 border-end pe-5">
            <img
              className="img-fluid border border-5"
              src={bookData.cover}
              alt=""
            />
          </div>
          <div className="col-8 ps-5">
            <div className="text-light">
              <h1>{bookData.title}</h1>
              <h3>{bookData.author}</h3>
              <h4>({bookData.year})</h4>
              <StarRating value={rating} onChange={setRating} />
              <p>Genre: {bookData.genre}</p>
              <p>Language: {bookData.language}</p>
              <p>{bookData.description}</p>
              {auth.user.is_admin && (
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
      )}
    </Container>
  );
};

export default SingleBook;
