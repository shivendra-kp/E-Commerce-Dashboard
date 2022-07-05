import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../helper";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signupClicked = () => {
        navigate("/signup");
    };
    const loginUser = async () => {
        //console.log("Email:", email, "Password:", password);
        const url = BACKEND_URL + "login";
        let result = await fetch(url, {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        result = await result.json();

        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        } else {
            alert("please enter valid credentials");
        }
    };
    return (
        <div>
            <form className="form-base">
                <h1>Login</h1>
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
                    <button type="button" className="btn-solid" onClick={loginUser}>
                        Login
                    </button>
                    <button type="button" className="btn-no-fill" onClick={signupClicked}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
