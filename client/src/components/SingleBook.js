import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import SingleBookReviews from "./SingleBookReviews";
import AuthContext from "../providers/auth-context";
import { HOST } from "../common/constants.js";
import { useNavigate, useParams } from "react-router-dom";

const SingleBook = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);
  const [review, setReview] = useState(null);

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
      .catch((error) => setError(error.message));
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
      .catch((error) => setError(error.message));
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

  if (bookData === null) {
    return <div className="Loader"></div>;
  }
  console.log(bookData);
  return (
    <div id="book">
      {showError()}
      <div className="content">
        <div id="book-detailed">
          <div className="poster-and-info">
            <div className="the-poster">
              <img src={bookData.cover} alt="" />
            </div>
            <div className="the-book-info-container">
              <div id="book-info">
                <p>Title: {bookData.title}</p>
                <p>Author: {bookData.author}</p>
                <p>Year: {bookData.year}</p>
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
          </div>
          <>
            <br />
            {review ? (
              <p style={{ marginLeft: "15px" }}>
                You have already reviewed this book.
              </p>
            ) : (
              <>
                <p style={{ marginLeft: "15px" }}>
                  Would you like to leave a review?
                </p>
                <Button
                  style={{ marginLeft: "15px" }}
                  variant="primary"
                  onClick={() =>
                    navigate(`/books/${bookData.id}/create-review`)
                  }
                >
                  Create Review
                </Button>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
