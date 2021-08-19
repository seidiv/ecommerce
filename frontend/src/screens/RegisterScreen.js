import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { userRegisterReducer } from "../reducers/userReducers";

function RegisterScreen({ location, history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(email);
        // console.log(password);
        console.log("here", error);
        if (password != confirmPassword) setMessage("پسورد ها همخوانی ندارد");
        else dispatch(register(name, email, password));
    };
    return (
        <FormContainer>
            <h1>ثبت نام</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>نام کاربری</Form.Label>
                    <Form.Control
                        required
                        type="name"
                        placeholder="نام کاربری خود را وارد کنید"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>ایمیل</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>پسورد</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="رمز خود را وارد کنید"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="passwordConfirm">
                    <Form.Label>تایید پسورد</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="رمز خود را تایید کنید"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                    <br></br>
                    <Button
                        type="submit"
                        variant="primary"
                        className="btn-block col-6 pa-3"
                        style={{ textAlign: "center", align: "center" }}
                    >
                        ثبت نام
                    </Button>

                    <Row className="py-3">
                        <Col>
                            حساب کاربری دارید ؟{" "}
                            <Link
                                to={
                                    redirect
                                        ? `/login?redirect=${redirect}`
                                        : `/login`
                                }
                            >
                                ورود
                            </Link>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </FormContainer>
    );
}

export default RegisterScreen;
