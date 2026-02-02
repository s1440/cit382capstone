import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function AppNavbar({ onLoginClick }) {
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
          {/* Login button on the right */}
          <Button variant="primary" onClick={onLoginClick}>
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
