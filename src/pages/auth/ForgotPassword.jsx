import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('tran.ttxuan91@gmail.com');
    const [loading, setLoading] = useState(false);
    const  user  = useSelector(state => state.user)

    useEffect(() => {
        //if user is logged in, app redirect to home page
        if (user && user.token) history.push("/")
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const actionCodeSettings = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email, actionCodeSettings)
            .then(() => {
                setLoading(false);
                setEmail('');
                toast.success('Check your email for password reset link')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                toast.error(error.message)
            })
    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger"><LoadingOutlined /> Loading ...</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Type your email"
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        disabled={!email}
                        block
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default ForgotPassword
