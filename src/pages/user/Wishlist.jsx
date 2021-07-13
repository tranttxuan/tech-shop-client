import { DeleteOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserNav from '../../components/nav/UserNav'
import { getWishlist, removeWishlist } from '../../functions/user';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const user = useSelector(state => state.user);

    const loadWishlist = useCallback(() => {
        getWishlist(user.token)
            .then(res => {
                setWishlist(res.data.wishlist)
            })
            .catch(error => console.log(error));
    })
    const handleRemove = (productId) => {
        removeWishlist(productId, user.token)
            .then(res => setWishlist(res.data.wishlist))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        loadWishlist();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Wishlist</h4>
                    {wishlist.length === 0
                        ? <h4>No product</h4>
                        : <>
                            {wishlist.map(p => (
                                <div key={p._id} className='alert alert-secondary'>
                                    <Link to={`/product/${p.slug}`}>{p.title}</Link>
                                    <p onClick={()=>handleRemove(p._id)}
                                        className='btn btn-sm float-right'>
                                        <DeleteOutlined />
                                    </p>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Wishlist
