import React from 'react'
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleDrawer } from '../../actions/drawerAction';
import noImage from "../../images/no_image_available.png";
import { Link } from 'react-router-dom';

function SideDrawer() {
    const { cart, drawer } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(setVisibleDrawer(false));
    }

    const imageStyle = {
        width: '100%',
        height: "50px",
        objectFit: 'cover',
    }

    return (
        <Drawer
            title={`Cart: ${cart.length} Product${cart.length > 1 && 's'}`}
            closable={false}
            onClose={onClose}
            visible={drawer}
        >
            {cart.map(product =>
                <div key={product._id} className="row">
                    <div className="col">
                        <img
                            src={product.images[0] ? product.images[0].url : ""}
                            style={imageStyle}
                        />
                        <p className='text-center bg-secondary text-light'>
                            {product.title} x <strong>{product.count}</strong>
                        </p>
                    </div>
                </div>
            )}
            <Link to="/cart">
                <button onClick={onClose} className='text-center btn btn-primary btn-raised btn-block'>Go to Cart</button>
            </Link>
        </Drawer>
    )
}

export default SideDrawer
