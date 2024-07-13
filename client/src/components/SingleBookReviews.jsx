import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";

const SingleBookReviews = ({ id }) => {
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    getBookReviews(getBookReviewRequest);
  }, []);

  async function getBookReviews(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        const result = await response.json();
        setReviewsData(result);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBookReviewRequest = new Request(`${HOST}/books/${id}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${localStorage.getItem("token")}`,
    },
  });

  return (
    <div className="mt-4">
      <h5 className="fw-bold">Sava94</h5>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <hr />
    </div>
  );
};

export default SingleBookReviews;
