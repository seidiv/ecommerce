import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen({ match, history }) {
    const productId = match.params.id;
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = productUpdate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push("/admin/productlist");
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, productId, product, history, successUpdate]);
    const submitHandler = (e) => {

 
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("image", file);
        formData.append("product_id", productId);

        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                "/api/products/upload/",
                formData,
                config
            );

            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    };
    return (
        <div>
            <Link to={"/admin/productlist"}>بازگشت</Link>
            <FormContainer>
                <h1>ویرایش محصول</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{error}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>نام</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="نام کالا را وارد کنید"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="price">
                            <Form.Label>قیمت </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=" قیمت را وارد کنید"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="image">
                            <Form.Label>تصویر</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="تصویر مورد نظر را وارد کنید"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <br></br>
                            <Form.File
                                id="image-file"
                                label=""
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <br></br>

                        <Form.Group controlId="brand">
                            <Form.Label>برند</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="برند را وارد کنید"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="countInStock">
                            <Form.Label>تعداد در انبار</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="تعداد را وارد کنید"
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="category">
                            <Form.Label>رده</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=" رده کالا را وارد کنید"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>

                        <Form.Group controlId="description">
                            <Form.Label>توضیحات</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="توضیحات"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <br></br>

                        <Button
                            type="submit"
                            variant="primary"
                            className="btn-block col-6 pa-3"
                            style={{ textAlign: "center", align: "center" }}
                        >
                            به روز رسانی
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductEditScreen;
