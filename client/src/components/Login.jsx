import { useContext, useState } from "react";
import { HOST } from "../common/constants";
import decode from "jwt-decode";
import AuthContext from "../providers/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const updateUser = (prop, value) => {
    setUser({
      ...user,
      [prop]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    fetch(`${HOST}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setAlertMsg(res.message);
          setIsOpen(true);
        } else {
          localStorage.clear();
          localStorage.setItem("token", res.token);
          const user = decode(res.token);
          auth.setAuthState({ user, isLoggedIn: true });
          navigate("/");
        }
      })
      .catch(() => navigate("/500"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="form-container p-5 rounded bg-light">
        <form>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className="form-control"
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
              onChange={(e) => updateUser("password", e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" onClick={(e) => login(e)}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
