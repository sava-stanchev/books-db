import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";
import { Button, Row, Form } from "react-bootstrap";

const Reviews = ({ content, username, date_created }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="fw-bold">{username}</h5>
        <span>{date_created.split("T")[0]}</span>
      </div>
      <p>{content}</p>
      <hr />
    </>
  );
};

const SingleBookReviews = ({ id, user }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    content: "",
  });

  useEffect(() => {
    getBookReviews(getBookReviewsRequest);
  }, []);

  async function getBookReviews(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        const result = await response.json();
        setReviews(result);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function createReview(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        getBookReviews(getBookReviewsRequest);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBookReviewsRequest = new Request(`${HOST}/books/${id}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  const createReviewRequest = new Request(`${HOST}/books/${id}/create-review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ newReview, user }),
  });

  return (
    <Row className="d-flex justify-content-center m-4">
      <div className="text-light">
        <h2 className="text-center">Reviews</h2>
        <Form>
          <Form.Group className="mb-3" controlId="review-input">
            <Form.Label>Leave a comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          onClick={() => createReview(createReviewRequest)}
        >
          Submit
        </Button>
        <div className="mt-4" role="list">
          {reviews.length === 0 ? (
            <div className="fw-bold fs-3">No reviews yet.</div>
          ) : (
            <div>
              <hr />
              {reviews.map((review) => (
                <Reviews key={review.id} {...review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Row>
  );
};

export default SingleBookReviews;
