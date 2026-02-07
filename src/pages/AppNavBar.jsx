import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function AppNavbar({ onLoginClick, onLogout, isLoggedIn, currentUser }) {
  return (
    <Navbar fixed="top" expand="lg" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">Cookn' Share</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Create Post</Nav.Link>
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
             </Nav>
            {/* Show status next to button */}
          <span className="login-status">
              {isLoggedIn ? `Welcome, ${currentUser}!` : "You are not logged in"}
            </span>
          {/* Login button on the right */}
          <Button variant="primary" onClick={isLoggedIn ? onLogout : onLoginClick}>
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
