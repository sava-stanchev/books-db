import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "src/utils/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page-background">
      <Link to={user ? "/books" : "/login"}>
        <Button variant="warning" size="lg">
          Enter The Book Database
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
