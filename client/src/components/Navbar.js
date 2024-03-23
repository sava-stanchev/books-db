import AuthContext from "../providers/auth-context";
import { useContext } from "react";
import { HOST } from "../common/constants";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";

const NavbarComponent = () => {
  const auth = useContext(AuthContext);
  const logout = () => {
    fetch(`${HOST}/logout`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }).then(() => {
      auth.setAuthState({
        user: null,
        isLoggedIn: false,
      });
      localStorage.removeItem("token");
    });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/home">BookDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            <Nav>
              {auth.isLoggedIn ? (
                <>
                  <Nav.Link href="/books">Books</Nav.Link>
                  <Nav.Link href="/home" onClick={() => logout()}>
                    Log Out
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
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
