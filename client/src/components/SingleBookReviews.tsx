import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";
import { Button, Row, Form } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EditReviewModal from "src/components/EditReviewModal";
import { Review, User } from "src/types";

type ReviewsProps = {
  review: Review;
  user: User;
  editReviewRequest: (reviewId: number) => Promise<void>;
  deleteReviewRequest: (reviewId: number) => Promise<void>;
  setUpdatedReviewContent: (content: string) => void;
};

const Reviews: React.FC<ReviewsProps> = ({
  review,
  user,
  editReviewRequest,
  deleteReviewRequest,
  setUpdatedReviewContent,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EditReviewModal
        show={show}
        handleClose={handleClose}
        editReviewRequest={editReviewRequest}
        review={review}
        setUpdatedReviewContent={setUpdatedReviewContent}
      />
      <div className="d-flex justify-content-between">
        <h5 className="fw-bold">{review.username}</h5>
        <div className="d-flex gap-1 align-items-center">
          <span className="me-1">{review.date_created.split("T")[0]}</span>
          {user.id === review.user_id && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <button
                type="button"
                className="icon edit-icon"
                onClick={handleShow}
                aria-label="Edit review"
              >
                <FaEdit />
              </button>
            </OverlayTrigger>
          )}
          {user.is_admin === 1 && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <button
                type="button"
                className="icon delete-icon"
                onClick={() => deleteReviewRequest(review.id)}
                aria-label="Delete review"
              >
                <FaTrashAlt />
              </button>
            </OverlayTrigger>
          )}
        </div>
      </div>
      <p>{review.content}</p>
      <hr />
    </>
  );
};

type SingleBookReviewsProps = {
  id: string;
  user: User;
};

const SingleBookReviews: React.FC<SingleBookReviewsProps> = ({ id, user }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [updatedReviewContent, setUpdatedReviewContent] = useState<string>("");

  useEffect(() => {
    getBookReviews(getBookReviewsRequest);
  }, []);

  async function getBookReviews(request: Request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        const result = await response.json();
        setReviews(result);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function createReview(request: Request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        getBookReviews(getBookReviewsRequest);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function editReviewRequest(reviewId: number) {
    try {
      const response = await fetch(`${HOST}/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ updatedReviewContent }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        getBookReviews(getBookReviewsRequest);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  async function deleteReviewRequest(reviewId: number) {
    try {
      const response = await fetch(`${HOST}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        getBookReviews(getBookReviewsRequest);
      }
    } catch (error) {
      console.error((error as Error).message);
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
    <Row className="d-flex justify-content-center my-4">
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
        <div className="mt-4">
          {reviews.length === 0 ? (
            <div className="fw-bold fs-3">No reviews yet.</div>
          ) : (
            <div>
              <hr />
              {reviews.map((review) => (
                <Reviews
                  key={review.id}
                  review={review}
                  user={user}
                  editReviewRequest={editReviewRequest}
                  deleteReviewRequest={deleteReviewRequest}
                  setUpdatedReviewContent={setUpdatedReviewContent}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Row>
  );
};

export default SingleBookReviews;
