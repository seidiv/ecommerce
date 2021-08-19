import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        dispatch(login(email, password));
    };
    return (
        <FormContainer>
            <h1>ورود</h1>
            {console.log(error)}
            {error && <Message variant="danger">{'هیچ حساب کاربری با این مشخصات وجود ندارد'}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>ایمیل</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="ایمیل خود را وارد کنید"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    {/* <Form.Control.Feedbacks  type="empty" >
                        این فیلد نمیتواند خالی باشد
                    </Form.Control.Feedbacks> */}
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
                <br></br>
                <Button
                    type="submit"
                    variant="primary"
                    className="btn-block col-6 pa-3"
                    style={{ textAlign: "center", align: "center" }}
                >
                    ورود
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    حساب کاربری ندارید ؟{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : `/register`
                        }
                    >
                        ایجاد حساب
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
