import PropTypes from 'prop-types';
import {useState} from 'react';
import {Button} from "react-bootstrap";

const Reviews = (props) => {
  const {content, date_created, remove, update} = props;
  const [updateMode, setModeUpdate] = useState(false);
  const [viewContent, setViewContent] = useState(content);

  const toggleUpdateMode = () => {
    setModeUpdate((prevState) => !prevState);
  }

  const saveEdit = () => {
    update({content: viewContent});
    toggleUpdateMode();
  }

  return(
    <div id="reviews">
      <div className="content">
        {updateMode ? (
          <input
            value={viewContent}
            onChange={(ev) => setViewContent(ev.target.value)}
          />
        ) : (
          <p>{viewContent}</p>
        )}

        <p>{date_created}</p>

        {updateMode ? (
          <Button variant="success" onClick={saveEdit}>Save</Button>
        ) : (
          <Button variant="warning" onClick={toggleUpdateMode}>Edit</Button>
        )}

        <Button variant="danger" onClick={remove}>Delete</Button>
      </div>
    </div>
  )
};

Reviews.propTypes = {
  reviews_id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  date_created: PropTypes.string.isRequired,
  removeReview: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
}

export default Reviews;
