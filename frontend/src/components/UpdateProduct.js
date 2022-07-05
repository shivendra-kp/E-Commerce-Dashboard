import React, { useEffect, useState } from "react";
import { BACKEND_URL, authFetch } from "../helper";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        const url = BACKEND_URL + "product/" + params.id;
        let result = await authFetch(url);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };

    const updateProduct = async () => {
        const url = BACKEND_URL + "update/" + params.id;
        let result;
        result = await authFetch(url, {
            method: "put",
            body: JSON.stringify({ name, price, category, result }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();
        console.log(result);
        navigate("/");
    };

    return (
        <div className="product">
            <form className="form-base">
                <h1>Update Product</h1>
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Price"
                    className="input-box"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Category"
                    className="input-box"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Company"
                    className="input-box"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <div className="form-button-container">
                    <button type="button" className="btn-solid" onClick={updateProduct}>
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
