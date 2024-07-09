import { useEffect, useState } from "react";
import { HOST } from "src/common/constants";
import { useNavigate } from "react-router-dom";
import AlertDismissible from "./Alert";

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
  const [strength, setStrength] = useState("");
  const [activeAlert, setActiveAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [newUser]);

  function evaluatePasswordStrength(password) {
    let score = 0;

    if (!password) return;
    if (password.length > 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return "weak";
      case 3:
        return "medium";
      case 4:
      case 5:
        return "strong";
    }
  }

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

  async function post(request) {
    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        navigate("/login");
        navigate(0);
      }
    } catch (error) {
      setActiveAlert(true);
      console.error(error.message);
    }
  }

  const registerRequest = new Request(`${HOST}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  return (
    <>
      <div className="position-absolute start-0 end-0">
        <div className="d-flex justify-content-center col-md-12">
          <AlertDismissible activeAlert={activeAlert} />
        </div>
      </div>
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
                onChange={(e) => {
                  setStrength(evaluatePasswordStrength(e.target.value));
                  updateUser("password", e.target.value);
                }}
              />
              <div className="password-strength-container">
                {newUser.password && (
                  <small>
                    Password strength: <strong>{strength}</strong>
                  </small>
                )}
              </div>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary"
                disabled={
                  Object.values(passwordError).includes(false) ||
                  Object.values(emailError).includes(false) ||
                  Object.values(usernameError).includes(false)
                }
                type="button"
                onClick={() => post(registerRequest)}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
