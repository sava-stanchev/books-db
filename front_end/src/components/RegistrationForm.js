import {Col, Container, Row, Form, Button} from "react-bootstrap";

const RegistrationForm = ({ genders, updateUser, user, register }) => {
  
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
                <Form.Control type="text" placeholder="Enter username" name="user_name" value={user.user_name} 
                onChange={e => updateUser('user_name', e.target.value)}/>
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
                <Form.Control type="text" placeholder="Enter first name" name="first_name" value={user.first_name} 
                onChange={e => updateUser('first_name', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="last_name" value={user.last_name} 
                onChange={e => updateUser('last_name', e.target.value)}/>
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
                <Form.Control type="number" placeholder="Enter age" name="user_age" value={user.user_age} 
                onChange={e => updateUser('user_age', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="gender"
                value={user.gender ? genders.filter(g => g.genders_id === user.gender)[0].gender:''}
                onChange={e => updateUser('gender', genders.filter(g => g.gender === e.target.value)[0].genders_id)}>
                  <option>Choose...</option>
                  {genders.map((g) => <option>{g.gender}</option>)}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" onClick={() => register()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default RegistrationForm;
