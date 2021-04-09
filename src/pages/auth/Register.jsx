import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";

const Register = () => {
    const [email, setEmail] = useState("tran.ttxuan91@gmail.com");

    const handleSubmit = (e) => {
        e.preventDefault();

        const actionCodeSettings = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        auth.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                // add user's email in local storage 
                // so user don't need to enter his email in next step: complete register in same desktop
                window.localStorage.setItem("emailForRegistration", email);
                toast.success(
                    `Email is sent to ${email}. Click the link to complete your registration`
                );
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form action="" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            autoFocus
                        />
                        <button type="submit" className="btn btn-raised btn-primary">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
