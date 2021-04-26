import {Col, Container, Row, Form, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();

  const routeChange = () =>{ 
    const path = `/books`; 
    history.push(path);
  }

  return( 
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
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
            <br/>
            <Button variant="primary" type="submit" onClick={routeChange}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default LoginForm;
