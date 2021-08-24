import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Container, Navbar, Row, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <header>
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
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            حساب کاربری
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        خروج از حساب
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> ورود
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown
                                    title="مدیریت"
                                    id="adminmenue"
                                    id="username"
                                >
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            کاربران
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            محصولات
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            سفارش ها
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                    <SearchBox />

                    <LinkContainer to="/">
                        <Navbar.Brand className='navbar-brand'>kaveh tools</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
