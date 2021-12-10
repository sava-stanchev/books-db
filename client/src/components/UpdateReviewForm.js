import {Form} from "react-bootstrap";

const UpdateReviewForm = ({review, updateReviewProps, updateReview}) => {
  
  return( 
    <div className="update-book-form">
      <div className="update-book-label-input-container">
        <div className="update-book-label-input">
          <Form.Control
            className="input-field"
            type="text"
            as="textarea"
            placeholder="Enter content"
            name="content"
            value={review.content} 
            onChange={e => updateReviewProps('content', e.target.value)}
          />
        </div>
        <button style={{marginTop: '15px', marginLeft: '100px'}} className="btn" variant="primary" onClick={() => updateReview()}>
          Submit
        </button>
      </div>
    </div>
  )
};

export default UpdateReviewForm;
