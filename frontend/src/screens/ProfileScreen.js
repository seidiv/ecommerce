import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstansts";
import { listMyOrders } from "../actions/orderActions";

function ProfileScreen({ history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, success]);
    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(email);
        // console.log(password);
        // console.log("here", error);
        if (password != confirmPassword) setMessage("پسورد ها همخوانی ندارد");
        else {
            dispatch(
                updateUserProfile({
                    id: user._id,
                    name: name,
                    email: email,
                    password: password,
                })
            );
            setMessage("");
        }
    };
    return (
        <Row>
            <Col md={3}>
                <h2>حساب کاربری</h2>
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
                            type="password"
                            placeholder="رمز خود را وارد کنید"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>تایید پسورد</Form.Label>
                        <Form.Control
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
                            به روز رسانی
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={9}>
                <h2>سفارش های من</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">
                        {"مشکلی در نمایش سفارش های شما به وجود آمده"}
                    </Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>شناسه</th>
                                <th>تاریخ</th>
                                <th>قیمت کل(تومان)</th>
                                <th>پرداخت شده</th>
                                <th>تحویل داده شده در</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                    <td><LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>جزئیات</Button>
                                    </LinkContainer></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
}

export default ProfileScreen;
