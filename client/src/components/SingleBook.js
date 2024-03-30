import { useEffect, useState, useContext } from "react";
import { Button, Container, Row } from "react-bootstrap";
import SingleBookReviews from "./SingleBookReviews";
import AuthContext from "../providers/auth-context";
import { HOST } from "../common/constants.js";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";

const SingleBook = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = { userId: auth.user.users_id };
    fetch(`${HOST}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userId),
    })
      .then((response) => response.json())
      .then((data) => setReview(data))
      .catch(() => navigate("/500"));
  }, [id, auth.user.users_id, bookData]);

  useEffect(() => {
    fetch(`${HOST}/books/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookData(data[0]))
      .finally(() => setLoading(false))
      .catch(() => navigate("/500"));
  }, [id]);

  const deleteBook = () => {
    fetch(`${HOST}/books/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => navigate(`/books`))
      .catch((error) => setError(error.message));
  };

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
          <div className="col-6 ps-5">
            <div className="text-light">
              <h1>{bookData.title}</h1>
              <h3>{bookData.author}</h3>
              <h4>({bookData.year})</h4>
              <p>Genre: {bookData.genre}</p>
              <p>Language: {bookData.language}</p>
              {auth.user.is_admin ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/books/${bookData.id}/update`)}
                  >
                    Update Book
                  </Button>
                  {"  "}
                  <Button variant="danger" onClick={() => deleteBook()}>
                    Delete Book
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </Row>
      )}
    </Container>
  );
};

export default SingleBook;
