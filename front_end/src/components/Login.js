import {Form, Button, Col, Row, Image} from 'react-bootstrap';

const Login = () => {
  return(
    <div className="App">
      <Row className="landing">
        <Col>
          <Form style={{width:"70%", marginLeft:"10%", marginTop:"30%"}}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
        <Col>
          <div>
            <Image src="./img/login-img.jpg" thumbnail style={{border:"none"}} />
          </div>
        </Col>
      </Row>
    </div>
  )
};

export default Login;
