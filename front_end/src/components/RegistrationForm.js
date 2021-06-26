import {useEffect, useState} from "react";
import {Col, Container, Row, Form, Button} from "react-bootstrap";
import {HOST} from '../common/constants.js';
import {useHistory} from "react-router-dom";

const initialState = {
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  user_age: '',
  email: '',
  gender: '',
}

const passVerificationError = {
  properLength: false,
};

const ageVerificationError = {
  properAgeNumber: false,
}

const emailVerificationError = {
  properEmail: false,
}

const usernameVerificationError = {
  properLength: false,
}

const firstNameVerificationError = {
  properLength: false,
}

const lastNameVerificationError = {
  properLength: false,
}

const RegistrationForm = ({genders}) => {
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const [ageError, setAgeError] = useState(ageVerificationError);
  const [emailError, setEmailError] = useState(emailVerificationError);
  const [usernameError, setUsernameError] = useState(usernameVerificationError);
  const [firstNameError, setFirstNameError] = useState(firstNameVerificationError);
  const [lastNameError, setLastNameError] = useState(lastNameVerificationError);

  const history = useHistory();
  const routeChange = () =>{ 
    const path = `/login`; 
    history.push(path);
  };

  useEffect(() => {}, [newUser]);

  const updateUser = (name, value) => {
    setNewUser({
      ...newUser,
      [name]: value,
    });

    if (name === "password") {
      const properLength = value.length >= 4 && value.length <= 30;
      setPasswordError({...passwordError, properLength});
    }

    if (name === "user_age") {
      const properAgeNumber = +value > 0 && +value < 100 && typeof +value === 'number';
      setAgeError({...ageError, properAgeNumber});
    }

    if (name === "email") {
      const properEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
      setEmailError({...emailError, properEmail});
    }

    if (name === "username") {
      const properLength = value.length >= 3 && value.length <= 20;
      setUsernameError({...usernameError, properLength});
    }

    if (name === "first_name") {
      const properLength = value.length >= 2 && value.length <= 20 && /^[a-zA-Z]+$/.test(value);
      setFirstNameError({...firstNameError, properLength});
    }

    if (name === "last_name") {
      const properLength = value.length >= 2 && value.length <= 20 && /^[a-zA-Z]+$/.test(value);
      setLastNameError({...lastNameError, properLength});
    }
  };

  const register = () => {
    fetch(`${HOST}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    .then((res) => res.json())
    .then((res) => {
      try {
        console.log({res});
      } catch (error) {
        console.warn(error);
      }
    })
    .then(()=>routeChange());
  };

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
                <Form.Control type="text" placeholder="Enter username" name="username" value={newUser.username} 
                onChange={e => updateUser('username', e.target.value)}/>
                <li className={usernameError.properLength ? "text-success" : "text-danger"}>Between 3 and 20 chars</li>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" name="password" value={newUser.password} 
                onChange={e => updateUser('password', e.target.value)}/>
                <li className={passwordError.properLength ? "text-success" : "text-danger"}>Between 4 and 30 chars</li>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="first_name" value={newUser.first_name} 
                onChange={e => updateUser('first_name', e.target.value)}/>
                <li className={firstNameError.properLength ? "text-success" : "text-danger"}>Between 2 and 20 letters</li>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="last_name" value={newUser.last_name} 
                onChange={e => updateUser('last_name', e.target.value)}/>
                <li className={lastNameError.properLength ? "text-success" : "text-danger"}>Between 2 and 20 letters</li>
              </Form.Group>
            </Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={newUser.email} 
                onChange={e => updateUser('email', e.target.value)}/>
                <li className={emailError.properEmail ? "text-success" : "text-danger"}>Valid email address</li>
              </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Enter age" name="user_age" value={newUser.user_age} 
                onChange={e => updateUser('user_age', e.target.value)}/>
                <li className={ageError.properAgeNumber ? "text-success" : "text-danger"}>Valid age number</li>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="gender"
                value={newUser.gender ? genders.filter(g => g.genders_id === newUser.gender)[0].gender:''}
                onChange={e => updateUser('gender', genders.filter(g => g.gender === e.target.value)[0].genders_id)}>
                  <option>Choose...</option>
                  {genders.map((g) => <option>{g.gender}</option>)}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <br/>
            <Button variant="primary" disabled={Object.values(passwordError).includes(false)} onClick={() => register()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default RegistrationForm;
