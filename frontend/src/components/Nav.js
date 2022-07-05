import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");

    const logout = async () => {
        await localStorage.clear();
        console.log("logging out...");
        navigate("/login");
    };

    return (
        <div>
            {auth ? (
                <ul className="nav-ui">
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                    <li>
                        <Link to="/add">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="nav-ui">
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
