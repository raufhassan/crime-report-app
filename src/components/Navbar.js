import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
      alert(error);
    }
  };

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
                    <NavDropdown.Item
                      as={Link}
                      to={{
                        pathname: "/add-report",
                        addProps: "complain",
                      }}
                    >
                      Complain
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={{
                        pathname: "/add-report",
                        addProps: "crime",
                      }}
                    >
                      Crime report
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={{
                        pathname: "/add-report",
                        addProps: "missingPerson",
                      }}
                    >
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
