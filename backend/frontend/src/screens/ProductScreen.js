import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Card,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import products from "../products";
import { useDispatch, useSelector } from "react-redux";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    let { loading, error, product } = productDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, { rating, comment }));
    };
    if (product == undefined) product = [];
    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                بازگشت
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} بازدید`}
                                        color={"#f8e825"}
                                    />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    قیمت: {product.price} تومان{" "}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    توضیحات: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>قیمت :</Col>
                                            <Col>
                                                <strong>
                                                    {product.price} تومان
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>وضعیت موجودی :</Col>
                                            <Col>
                                                {product.countInStock > 0
                                                    ? `موجود(${product.countInStock})`
                                                    : "ناموجود"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>تعداد :</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) =>
                                                            setQty(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className="btn-block col-12"
                                            disabled={product.countInStock == 0}
                                            type="button"
                                        >
                                            اضافه به سبد خرید
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <br></br>
                            <h4> نظرات کاربران</h4>
                            {product.reviews.length === 0 && (
                                <Message variant="info">
                                    {"هیچ نظری وجود ندارد"}
                                </Message>
                            )}

                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating
                                            value={review.rating}
                                            color="#f8e825"
                                        />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    {loadingProductReview && <Loader />}
                                    {successProductReview && (
                                        <Message variant="success">
                                            {"نظر شما با موفقیت ثبت شد"}
                                        </Message>
                                    )}
                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    <h4>نظر خود را بنویسید</h4>
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>امتیاز</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        انتخاب کنید...
                                                    </option>
                                                    <option value="1">
                                                        بسیار ضعیف
                                                    </option>
                                                    <option value="2">
                                                        ضعیف
                                                    </option>
                                                    <option value="3">
                                                        متوسط
                                                    </option>
                                                    <option value="4">
                                                        خوب
                                                    </option>
                                                    <option value="5">
                                                        خیلی خوب
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="comment">
                                                <Form.Label>نظر شما</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="5"
                                                    value={comment}
                                                    placeholder="نظر شما"
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <br></br>
                                            <Button
                                                disabled={loadingProductReview}
                                                type="submit"
                                                variant="primary"
                                            >
                                                ارسال نظر
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="info">
                                            برای نوشتن نظر لطفا به{" "}
                                            <Link to="/login">حساب کاربری</Link>{" "}
                                            خود وارد شوید
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default ProductScreen;
