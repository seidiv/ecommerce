import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    if (!shippingAddress.address) {
        history.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder");
    };
    return (
        <FormContainer >
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">انتخاب روش پرداخت</Form.Label>
                    <Col>
                        <Form.Check

                            type="radio"
                            label="درگاه بانک ملی"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <br></br>
                <Button type="submit" variant="primary">
                    ادامه فرایند خرید
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;
