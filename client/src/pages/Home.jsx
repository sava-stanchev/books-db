import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "src/utils/auth-context";
import { Button } from "react-bootstrap";

const HomePage = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="home-page-background">
      <Link to={auth.isLoggedIn ? "/books" : "/login"}>
        <Button variant="warning" size="lg">
          Enter The Book Database
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
