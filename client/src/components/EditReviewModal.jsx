import { Button, Form, Modal } from "react-bootstrap";

const EditReviewModal = ({
  show,
  handleClose,
  editReviewRequest,
  review,
  setUpdatedReview,
}) => {
  return (
    <Modal backdrop="static" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="edit-review-input">
            <Form.Control
              autoFocus
              as="textarea"
              rows={3}
              defaultValue={review.content}
              onChange={(e) => setUpdatedReview(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            editReviewRequest(review.id);
            handleClose();
          }}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReviewModal;
