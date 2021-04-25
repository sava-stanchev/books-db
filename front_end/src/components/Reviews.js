import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";

const Reviews = ({reviews_id, content, date_created, removeReview}) => {

  return(
    <div id="reviews">
        <p>"{content}"</p>
        <p>{date_created}</p>
        <Button variant="danger" onClick={() => removeReview(reviews_id)}>Delete</Button>
      </div>
  )
};

Reviews.propTypes = {
  reviews_id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  date_created: PropTypes.string.isRequired,
  removeReview: PropTypes.func.isRequired,
}

export default Reviews;
