import {Col, Container, Row, Form, Button} from "react-bootstrap";

const AddReviewForm = ({ review, updateReview, addReview }) => {
  
  return( 
    <Container>
      <Row>
        <Col>
          <h1>Create!</h1>
        </Col>
      </Row>
      <br/>

      <Row>
        <Col>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="Enter content" name="content" value={review.content} 
              onChange={e => updateReview('content', e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={() => addReview()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default AddReviewForm;
