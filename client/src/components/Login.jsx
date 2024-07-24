import { useContext, useState } from "react";
import { HOST } from "src/common/constants";
import decode from "jwt-decode";
import AuthContext from "src/utils/auth-context";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AlertDismissible from "src/components/Alert";

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const updateUser = (prop, value) => {
    setUser({
      ...user,
      [prop]: value,
    });
  };

  async function signIn(request) {
    setActiveAlert(false);

    try {
      const response = await fetch(request);
      const result = await response.json();

      if (!response.ok) {
        setAlertMessage(result.message);
        throw new Error(`Response status: ${response.status}`);
      } else {
        localStorage.clear();
        localStorage.setItem("token", result.token);
        const user = decode(result.token);
        auth.setAuthState({ user, isLoggedIn: true });
        navigate("/");
      }
    } catch (error) {
      setActiveAlert(true);
      console.error(error.message);
    }
  }

  const loginRequest = new Request(`${HOST}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return (
    <>
      <div className="position-absolute start-0 end-0">
        <div className="d-flex justify-content-center col-md-12">
          <AlertDismissible
            activeAlert={activeAlert}
            alertMessage={alertMessage}
          />
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
                type="button"
                onClick={() => signIn(loginRequest)}
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
