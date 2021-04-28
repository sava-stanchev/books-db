import {Navbar, Nav} from 'react-bootstrap';
import {
  Link
} from 'react-router-dom';

const NavBar = () => {
  return(
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/home">
          <Navbar.Brand href="#home">LibraryApp</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/books">
              <Nav.Link href="#books">Books</Nav.Link>
            </Link>
            <Link to="/reviews">
              <Nav.Link href="#reviews">Reviews</Nav.Link>
            </Link>
            <Link to="/about">
              <Nav.Link href="#about">About</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Link to="/login">
              <Nav.Link href="#login">Login</Nav.Link>
            </Link>
            <Link to="/register">
              <Nav.Link eventKey={2} href="#register">
                Register
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
};

export default NavBar;
