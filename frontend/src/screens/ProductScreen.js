import React , {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";
import axios from "axios";

function ProductScreen({ match }) {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                بازگشت
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
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
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>قیمت :</Col>
                                    <Col>
                                        <strong>{product.price} تومان</strong>
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
                            <ListGroup.Item>
                                <Button
                                    
                                    className="btn-block"
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
        </div>
    );
}

export default ProductScreen;
