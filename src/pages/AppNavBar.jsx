import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function AppNavbar({
  onLoginClick,
  isLoggedIn,
  user,
  onLogout,
}) {
  return (
    <Navbar fixed="top" expand="lg" bg="light">
      <Container fluid>
        <Link to="/" className="navbar-logo">
          <img
            src="/logosmall.png"
            alt="Cookn' Share logo"
            className="nav-logo-img"
          />
        </Link>
        <Navbar.Brand href="/">Cookn' Share</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create">
              Create Post
            </Nav.Link>
            <Nav.Link as={Link} to="/feed">
              Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <span className="me-2">Welcome, {user?.name}!</span>
                <Button variant="secondary" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={onLoginClick}>
                Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
