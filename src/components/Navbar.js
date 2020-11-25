import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Link, useHistory } from "react-router-dom";
export default function NavBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
      alert(error);
    }
  }
  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Crime-report
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {currentUser ? (
                <>
                  <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
                  <NavDropdown title="Add report" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/complain">
                      Complain
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/crime">
                      Crime report
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/missig-person">
                      Missing person
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    SignUp
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
