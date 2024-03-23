import { useEffect, useState } from "react";
import { HOST } from "../common/constants.js";
import { useNavigate } from "react-router-dom";

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

const Register = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);
  const [emailError, setEmailError] = useState(emailVerificationError);
  const [usernameError, setUsernameError] = useState(usernameVerificationError);
  const navigate = useNavigate();

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
      .then(() => {
        navigate("/login");
        navigate(0);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="form-container p-5 rounded bg-light">
        <form>
          <h3 className="text-center">Sign Up</h3>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="form-control"
              value={newUser.email}
              onChange={(e) => updateUser("email", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className="form-control"
              value={newUser.username}
              onChange={(e) => updateUser("username", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              value={newUser.password}
              onChange={(e) => updateUser("password", e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary"
              disabled={
                Object.values(passwordError).includes(false) ||
                Object.values(emailError).includes(false) ||
                Object.values(usernameError).includes(false)
              }
              onClick={() => register()}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
