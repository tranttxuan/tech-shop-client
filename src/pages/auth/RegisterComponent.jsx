import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signin } from "../../actions/userActions";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../functions/auth";


const RegisterComponent = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            //   console.log("RESULT", result);
            if (result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                createOrUpdateUser(idTokenResult.token)
                    .then(res => {
                        const { email,  name, role, _id } = res.data
                        const token = idTokenResult.token;
                        dispatch(signin(email, name, role, _id , token));
                    })
                    .catch(error => toast.error(error.message))
                // redirect
                history.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>   Complete Register</h4>
                    <form action="" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            value={email}
                            disabled={email}
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                            name="email"
                            autoFocus
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            name="password"
                            autoFocus
                        />
                        <button type="submit" className="btn btn-raised btn-primary">
                            Complete Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
