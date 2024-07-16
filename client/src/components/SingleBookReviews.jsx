import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";

const Reviews = ({ content, username }) => {
  return (
    <div>
      <h5 className="fw-bold">{username}</h5>
      <p>{content}</p>
      <hr />
    </div>
  );
};

const SingleBookReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
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
          {reviews.map((review) => (
            <Reviews key={review.id} {...review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleBookReviews;
