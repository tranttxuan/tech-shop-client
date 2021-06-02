import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import AdminNav from '../../../components/nav/AdminNav';
import { createCoupon, getCoupon, removeCoupon } from '../../../functions/coupon'
import { toast } from 'react-toastify';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';


function CreateCoupon() {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState('');
    const [nameError, setNameError] = useState('');
    const [coupons, setCoupons] = useState([])

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const getAllCoupons = useCallback(
        () => {
            getCoupon()
                .then(coupons => setCoupons(coupons.data))
                .catch(err => toast.error(err.message))
        },
        [],
    )

    const handleChangeName = (e) => {
        let name = e.target.value;
        setName(name.toUpperCase());
        if (name.length < 6) {
            setNameError('Name is too short. Coupon has at least 6 characters and its maximum length is 12 characters');
        } else if (name.length > 12) {
            setNameError('Name is too long.  Coupon has at least 6 characters and its maximum length is 12 characters');
        } else {
            setNameError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (!nameError) {
            createCoupon({ name, expiry, discount }, user.token)
                .then(response => {
                    setLoading(false);
                    getAllCoupons();
                    setName('');
                    setDiscount('');
                    setExpiry('');
                    toast.success(`Coupon ${response.data.name} is created`)
                })
                .catch(err => toast.error(err.message))
        };
    }

    const handleRemoveCoupon = (couponId) => {
        if (window.confirm('Delete?')) {
            setLoading(true)
            removeCoupon(couponId, user.token)
                .then(res => {
                    getAllCoupons();
                    setLoading(false);
                    toast.info(`Coupon ${res.data.name} is deleted`)
                })
                .catch(err => toast.error(err.message))
        }
    }

    useEffect(() => {
        getAllCoupons()
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading
                        ? <h4 className='text-danger'><LoadingOutlined />Loading...</h4>
                        : <h4>Coupon</h4>
                    }

                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className='text-muted'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                value={name}
                                name='name'
                                onChange={handleChangeName}
                                required
                                autoFocus />
                            {nameError && <p>{nameError}</p>}
                        </div>
                        <div className='form-group'>
                            <label className='text-muted'>Discount %</label>
                            <input
                                type='number'
                                className='form-control'
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                                autoFocus />
                        </div>
                        <div className='form-group'>
                            <label className='text-muted'>Expiry</label>
                            <br />
                            <DatePicker
                                value={expiry}
                                onChange={date => setExpiry(date)}
                                required
                            />
                        </div>
                        <button className='btn btn-primary'>Save</button>
                    </form>
                    <br />
                    <h4>{coupons.length} Coupon{coupons.length <2 ? '':'s'}</h4>
                    <table className='table table-bordered'>
                        <thead className='thead-light'>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Expiry</th>
                                <th scope='col'>Discount</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(c =>
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}%</td>
                                    <td >
                                        <DeleteOutlined
                                            onClick={() => handleRemoveCoupon(c._id)}
                                            className='text-danger'
                                            style={{ cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCoupon
