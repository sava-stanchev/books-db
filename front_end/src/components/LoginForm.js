import {Col, Container, Row, Form, Button} from "react-bootstrap";

const LoginForm = ({ user, updateUser, login }) => {

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
                <Form.Control type="text" placeholder="Enter username" name="user_name" value={ user.user_name} 
                onChange={e => updateUser('user_name', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} 
                onChange={e => updateUser('password', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <br/>
            <Button variant="primary" onClick={() => login()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default LoginForm;
