import { Col, Container, Row, Form, Button } from "react-bootstrap";

const RegistrationForm = () => {
    return <Container>
        <Row>
            <Col>
                <h1>Register</h1>
            </Col>
        </Row>
        <br/>

        <Row>
            <Col>
            <Form>
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" />
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter password" />
    </Form.Group>
  </Form.Row>
  <Form.Row>
  <Form.Group as={Col}>
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Enter first name" />
  </Form.Group>

  <Form.Group as={Col}>
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Enter last name" />
  </Form.Group>
  </Form.Row>
  <Form.Group as={Col}>
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Row>
    <Form.Group as={Col}>
      <Form.Label>Age</Form.Label>
      <Form.Control type="number" placeholder="Enter age" />
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Gender</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>Male</option>
        <option>Female</option>
      </Form.Control>
    </Form.Group>

  </Form.Row>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
            </Col>
        </Row>

    </Container>;
};

export default RegistrationForm;