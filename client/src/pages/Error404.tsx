import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center text-light">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">Page not found.</p>
        <p className="lead">The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")} variant="primary" size="lg">
          Go to home
        </Button>
      </div>
    </div>
  );
};

export default Error404;
