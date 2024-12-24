import { useState } from "react";
import { HOST } from "src/common/constants";
import { useNavigate } from "react-router-dom";
import AlertDismissible from "src/components/Alert";

const initialState = {
  username: "",
  password: "",
  email: "",
};

const validationRules = {
  email: (value) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      value
    ),
  username: (value) => value.length >= 3 && value.length <= 20,
  password: (value) => value.length >= 4 && value.length <= 30,
};

const evaluatePasswordStrength = (password) => {
  if (!password) return "";

  const conditions = [
    password.length > 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const score = conditions.filter(Boolean).length;

  if (score <= 1) return "weak";
  if (score === 2) return "medium";
  return "strong";
};

const Register = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [errors, setErrors] = useState({
    email: false,
    username: false,
    password: false,
  });
  const [strength, setStrength] = useState("");
  const [alert, setAlert] = useState({ active: false, message: "" });
  const navigate = useNavigate();

  const updateField = (name, value) => {
    setNewUser((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationRules[name](value) }));
    if (name === "password") setStrength(evaluatePasswordStrength(value));
  };

  const handleSignUp = async () => {
    const request = new Request(`${HOST}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    try {
      const response = await fetch(request);
      const result = await response.json();

      if (!response.ok) {
        setAlert({ active: true, message: result.message });
        throw new Error(`Error: ${response.status}`);
      }

      navigate("/login");
      navigate(0);
    } catch (error) {
      console.error(error.message);
    }
  };

  const isFormValid = Object.values(errors).every(Boolean);

  return (
    <div className="d-flex justify-content-center align-items-center flex-fill bg-dark">
      <AlertDismissible
        activeAlert={alert.active}
        alertMessage={alert.message}
      />
      <div className="form-container p-5 rounded bg-light">
        <form>
          <h3 className="text-center">Sign Up</h3>
          {["email", "username", "password"].map((field) => (
            <div className="mb-4" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                placeholder={`Enter ${field}`}
                className="form-control"
                value={newUser[field]}
                onChange={(e) => updateField(field, e.target.value)}
              />
              {field === "password" && newUser.password && (
                <small>
                  Password strength: <strong>{strength}</strong>
                </small>
              )}
            </div>
          ))}
          <div className="d-grid">
            <button
              className="btn btn-primary"
              disabled={!isFormValid}
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
