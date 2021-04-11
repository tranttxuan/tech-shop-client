import { LoadingOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase';

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("")
                toast.success("Password updated");
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message)
                setLoading(false)
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                
                <div className="col">
                    <h4>Password Update</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your password</label>
                            <input
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter new password"
                                value={password}
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!password || password.length < 6 || loading}
                            >
                                {loading
                                    ? <h4 className="text-danger"><LoadingOutlined /> Loading ...</h4>
                                    : "Submit"}

                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password
