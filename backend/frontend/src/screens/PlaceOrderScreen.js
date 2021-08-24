import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
function PlaceOrderScreen({ history }) {
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, error, success } = orderCreate;
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
    cart.taxPrice = 0;

    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    if (!cart.paymentMethod) {
        history.push("/payment");
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, history]);

    const placeOrder = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>ارسال به : </h2>
                            <p>
                                <strong>ارسال به </strong>
                                {cart.shippingAddress.address} ,{" "}
                                {cart.shippingAddress.city} ,{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>روش پرداخت :</h2>
                            <p>{cart.paymentMethod}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>کالا های خریداری شده : </h2>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">
                                    سبد خرید شما خالی است !
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                    <Col>{cart.itemsPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه ارسال : </Col>
                                    <Col>{cart.shippingPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>مالیات :‌ </Col>
                                    <Col>{cart.taxPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه نهایی ‌: </Col>
                                    <Col>{cart.totalPrice} تومان</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && (
                                    <Message variant="danger">
                                        {"مشکلی در سبد خرید شما وجود دارد"}
                                    </Message>
                                )}
                                {/* {console.log(error)} */}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block col-12"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    نهایی سازی خرید
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PlaceOrderScreen;
