import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { HOST } from "../common/constants.js";
import { useHistory } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  email: "",
};

const passVerificationError = {
  properLength: false,
};

const emailVerificationError = {
  properEmail: false,
};

const usernameVerificationError = {
  properLength: false,
};

const RegistrationForm = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const [emailError, setEmailError] = useState(emailVerificationError);
  const [usernameError, setUsernameError] = useState(usernameVerificationError);

  const history = useHistory();
  const routeChange = () => {
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
      setPasswordError({ ...passwordError, properLength });
    }

    if (name === "email") {
      const properEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      setEmailError({ ...emailError, properEmail });
    }

    if (name === "username") {
      const properLength = value.length >= 3 && value.length <= 20;
      setUsernameError({ ...usernameError, properLength });
    }
  };

  const register = () => {
    fetch(`${HOST}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((res) => {
        try {
          console.log({ res });
        } catch (error) {
          console.warn(error);
        }
      })
      .then(() => routeChange());
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Register</h1>
        </Col>
      </Row>
      <br />

      <Row>
        <Col>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={newUser.username}
                  onChange={(e) => updateUser("username", e.target.value)}
                />
                <li
                  className={
                    usernameError.properLength ? "text-success" : "text-danger"
                  }
                >
                  Between 3 and 20 chars
                </li>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={newUser.password}
                  onChange={(e) => updateUser("password", e.target.value)}
                />
                <li
                  className={
                    passwordError.properLength ? "text-success" : "text-danger"
                  }
                >
                  Between 4 and 30 chars
                </li>
              </Form.Group>
            </Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newUser.email}
                onChange={(e) => updateUser("email", e.target.value)}
              />
              <li
                className={
                  emailError.properEmail ? "text-success" : "text-danger"
                }
              >
                Valid email address
              </li>
            </Form.Group>
            <br />
            <Button
              variant="primary"
              disabled={Object.values(passwordError).includes(false)}
              onClick={() => register()}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
