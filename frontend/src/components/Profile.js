import React, { useState, useEffect } from "react";
import { BACKEND_URL, authFetch } from "../helper";

const Profile = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        const _name = JSON.parse(localStorage.getItem("user")).name;
        setName(_name);
    };

    const updateProfile = async () => {
        const url = BACKEND_URL + "update-profile/" + JSON.parse(localStorage.getItem("user"))._id;
        console.log(url);
        let result = await authFetch(url, {
            method: "put",
            body: JSON.stringify({ name }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        const user = JSON.parse(localStorage.getItem("user"));
        user.name = name;
        localStorage.setItem("user", JSON.stringify(user));
    };
    return (
        <div>
            <form className="form-base">
                <h1>Update Profile</h1>
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="input-box"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="form-button-container">
                    <button type="button" className="btn-solid" onClick={updateProfile}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
