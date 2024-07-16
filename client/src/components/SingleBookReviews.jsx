import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";

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

const SingleBookReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);

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

  const getBookReviewsRequest = new Request(`${HOST}/books/${id}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  return (
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
  );
};

export default SingleBookReviews;
