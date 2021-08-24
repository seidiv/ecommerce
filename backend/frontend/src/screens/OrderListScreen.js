import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";

function OrderListScreen({ history }) {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push("/login");
        }
    }, [dispatch, history, userInfo]);

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>سفارش دهنده</th>
                            <th>تاریخ</th>
                            <th>قیمت کل</th>
                            <th>پرداخت شده</th>
                            <th>ارسال شده</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} تومان</td>

                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    {order.isDelivered ? (
                                        order.deleveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            جزئیات
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default OrderListScreen;
