import {Col, Container, Row, Form, Button} from "react-bootstrap";

const UpdateReviewForm = ({ review, updateReviewProps, updateReview }) => {
  
  return( 
    <Container>
      <Row>
        <Col>
          <h1>Update!</h1>
        </Col>
      </Row>
      <br/>

      <Row>
        <Col>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="Enter content" name="content" value={review.content} 
              onChange={e => updateReviewProps('content', e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={() => updateReview()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default UpdateReviewForm;
