import { useContext } from "react";
import AuthContext from "src/utils/auth-context";
import { HOST } from "src/common/constants";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";

const useSignOut = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const logoutRequest = new Request(`${HOST}/logout`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await fetch(logoutRequest);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      auth.setAuthState({ user: null, isLoggedIn: false });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return signOut;
};

const NavbarComponent = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const signOut = useSignOut();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BooksDB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                <>
                  {user?.is_admin === 1 && (
                    <Nav.Link as={Link} to="/users">
                      Users
                    </Nav.Link>
                  )}
                  <Nav.Link as={Link} to="/books">
                    Books
                  </Nav.Link>
                  <Nav.Link onClick={signOut}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavbarComponent;
