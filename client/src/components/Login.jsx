import { useContext, useState } from "react";
import { HOST } from "../common/constants";
import decode from "jwt-decode";
import AuthContext from "../providers/auth-context";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AlertDismissible from "./Alert";

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        localStorage.clear();
        localStorage.setItem("token", res.token);
        const user = decode(res.token);
        auth.setAuthState({ user, isLoggedIn: true });
        navigate("/");
      })
      .catch(() => setActiveAlert(true));
  };

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
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Password"
                  className="form-control pe-5"
                  onChange={(e) => updateUser("password", e.target.value)}
                />
                <button
                  className="password-eye-icon"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary"
                onClick={(e) => login(e)}
                disabled={!user.username || !user.password}
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

export default Login;
