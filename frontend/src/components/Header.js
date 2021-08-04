import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav , Container , Navbar , Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <header style={{ direction: "rtl !important" }}>
            <Navbar bg="dark" variant="dark" expand="lg" collapsOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i> سبد
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i> ورود
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                    <LinkContainer to="/">
                        <Navbar.Brand>ADTools</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header
