import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { saveShippingAddress } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";

function OrderScreen({ match }) {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    }

    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId));
        }
    }, [order, orderId]);
    if (error) order.orderItems = [];
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>سفارش :‌ {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>ارسال به : </h2>
                            <p>
                                <strong>نام :‌ </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>ایمیل :‌ </strong>
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>ارسال به </strong>
                                {order.shippingAddress.address} ,{" "}
                                {order.shippingAddress.city} ,{" "}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingPrice.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    در {order.deliveredAt} تحویل پست شد
                                </Message>
                            ) : (
                                <Message variant="warning">ارسال نشده</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>روش پرداخت :</h2>
                            <p>{order.paymentMethod}</p>

                            {order.isPaid ? (
                                <Message variant="success">
                                    پرداخت شده در {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="warning">پرداخت نشده</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">
                                    {" سبد خرید شما خالی است !"}
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.qty} ✕ {item.price}{" "}
                                                    تومان ={" "}
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}{" "}
                                                    تومان
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>خلاصه سفارش</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>قیمت اجناس : </Col>
                                    <Col>{order.itemsPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه ارسال : </Col>
                                    <Col>{order.shippingPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>مالیات :‌ </Col>
                                    <Col>{order.taxPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه نهایی ‌: </Col>
                                    <Col>{order.totalPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
