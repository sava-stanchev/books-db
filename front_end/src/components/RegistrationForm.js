import {Col, Container, Row, Form, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const RegistrationForm = ({ genders, updateUser, user }) => {
  const history = useHistory();

  const routeChange = () =>{ 
    const path = `/login`; 
    history.push(path);
  }
  console.log(genders);

  return( 
    <Container>
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
                <Form.Control type="text" placeholder="Enter username" name="userName" value={user.userName} 
                onChange={e => updateUser('userName', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} 
                onChange={e => updateUser('password', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" value={user.firstName} 
                onChange={e => updateUser('firstName', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" value={user.lastName} 
                onChange={e => updateUser('lastname', e.target.value)}/>
              </Form.Group>
            </Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="e_mail" value={user.e_mail} 
                onChange={e => updateUser('e_mail', e.target.value)}/>
              </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Enter age" name="userAge" value={user.userAge} 
                onChange={e => updateUser('userAge', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="gender" value={user.gender} 
                onChange={e => updateUser('gender', e.target.value)}>
                  <option>Choose...</option>
                  {genders.map((g) => <option>{g.gender}</option>)}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit" onClick={routeChange}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default RegistrationForm;
