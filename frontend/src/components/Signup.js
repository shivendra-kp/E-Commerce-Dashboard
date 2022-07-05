import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../helper";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    });

    const collectData = async () => {
        const url = BACKEND_URL + "register";
        let result = await fetch(url, {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();
        //console.log(result);

        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("auth", JSON.stringify(result.auth));
        navigate("/");
    };

    const loginClicked = () => {
        navigate("/login");
    };

    return (
        <div className="centre-container">
            <form className="form-base">
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="input-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="input-box"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="form-button-container">
                    <button type="button" className="btn-solid" onClick={collectData}>
                        Sign Up
                    </button>

                    <button type="button" className="btn-no-fill" onClick={loginClicked}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
