import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, authFetch } from "../helper";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const url = BACKEND_URL + "add-product";

        //validate form
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        //backend api call
        let result = await authFetch(url, {
            method: "post",
            body: JSON.stringify({ name, price, userId, category, company }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();

        //Add notifications that product is added
        navigate("/");
    };

    return (
        <div className="product">
            <form className="form-base">
                <h1>Add New Product</h1>
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <div className="form-error">please enter valid name</div>}
                <input
                    type="text"
                    placeholder="Enter Price"
                    className="input-box"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && <div className="form-error">please enter valid price</div>}

                <input
                    type="text"
                    placeholder="Enter Category"
                    className="input-box"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {error && !category && (
                    <div className="form-error">please enter valid category</div>
                )}

                <input
                    type="text"
                    placeholder="Enter Company"
                    className="input-box"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                {error && !company && <div className="form-error">please enter valid company</div>}
                <div className="form-button-container">
                    <button type="button" className="btn-solid" onClick={addProduct}>
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
