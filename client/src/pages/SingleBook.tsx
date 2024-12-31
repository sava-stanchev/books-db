import { useEffect, useState, useContext } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { AuthContext } from "src/utils/AuthContext";
import { HOST } from "src/common/constants";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "src/components/Loader";
import StarRating from "src/components/StarRating";
import SingleBookReviews from "src/components/SingleBookReviews";
import { Book } from "src/types";

const SingleBook = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [bookData, setBookData] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number | null>(null);
  const [numRatings, setNumRatings] = useState<number | null>(null);
  const [userBookRating, setUserBookRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`${HOST}/books/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: Book = await response.json();
        setBookData(result);
        setRating(result.avg_rating);
        setNumRatings(result.num_ratings);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookData();
  }, [id]);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const response = await fetch(`${HOST}/books/${id}/user-rating`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setUserBookRating(result.rating);
      } catch (error) {
        console.error(error);
      }
    };

    if (user && id) fetchUserRating();
  }, [id, user]);

  const handleDeleteBook = async (bookId: string | undefined) => {
    try {
      const response = await fetch(`${HOST}/books/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      navigate(`/books`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="my-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row className="d-flex flex-lg-row flex-column">
            <div className="d-flex d-lg-block col-lg-4 pe-lg-5 justify-content-center my-3 mb-lg-0">
              <img
                className="img-fluid border border-5"
                src={bookData?.cover}
                alt="Book Cover"
              />
            </div>
            <div className="col-lg-8 ps-lg-5">
              <div className="text-light">
                <h1>{bookData?.title}</h1>
                <h2>{bookData?.author}</h2>
                <h3>({bookData?.year})</h3>
                <StarRating
                  value={rating}
                  rating={rating}
                  setRating={setRating}
                  numRatings={numRatings}
                  setNumRatings={setNumRatings}
                  id={id!}
                  user={user}
                  disabled={userBookRating !== null && userBookRating > 0}
                />
                {userBookRating !== null && (
                  <p>
                    {userBookRating > 0
                      ? `You gave this book ${userBookRating} ${
                          userBookRating === 1 ? "star" : "stars"
                        }.`
                      : "You haven't rated this book yet."}
                  </p>
                )}
                <p>Genre: {bookData?.genre}</p>
                <p>Language: {bookData?.language}</p>
                <p className="book-description">{bookData?.description}</p>
                {user && user.is_admin && (
                  <Button variant="danger" onClick={() => handleDeleteBook(id)}>
                    Delete Book
                  </Button>
                )}
              </div>
            </div>
          </Row>
          <SingleBookReviews id={id!} user={user} />
        </>
      )}
    </Container>
  );
};

export default SingleBook;
