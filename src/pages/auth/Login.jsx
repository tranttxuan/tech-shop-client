import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleAuthProvider } from "../../firebase";

const Login = ({ history }) => {
    const [email, setEmail] = useState("tran.ttxuan91@gmail.com");
    const [password, setPassword] = useState("tx00112233");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const dispatchUserAndToken = async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                email: user.email,
                token: idTokenResult.token
            }
        })
        // redirect
        history.push("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(email, password)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            await dispatchUserAndToken(result);
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }

    };

    const googleLogin = async (e) => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                await dispatchUserAndToken(result);
            })
            .catch(err => {
                toast.error(err.message)
            })
    }


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading ? <h4 >Login</h4> : <h4 className="text-danger">Loading ...</h4>}
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <Button
                                type="primary"
                                shape="round"
                                block
                                icon={<MailOutlined />}
                                size="large"
                                disabled={!email || password.length < 6}
                                htmlType="submit"
                            >
                                Login with your email and password
                        </Button>
                        </div>
                        <div className="form-group">
                            <Button
                                type="danger"
                                shape="round"
                                block
                                icon={<GoogleOutlined />}
                                size="large"
                                onClick={googleLogin}
                            >
                                Login with Google
                        </Button>
                            <div className="form-group">
                                <Link to="/forgot/password" className="float-right text-danger">
                                Forgot Password
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
