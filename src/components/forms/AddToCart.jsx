import { ShoppingCartOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { addProductToCart } from '../../actions/cartActions';
import { useDispatch } from 'react-redux';
import { setVisibleDrawer } from '../../actions/drawerAction';

function AddToCart({ product }) {
    const [toolTip, setToolTip] = useState('Click to add');

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        setToolTip('Added');
        dispatch(setVisibleDrawer(true));
        dispatch(addProductToCart({ ...product, count: 1 }));
    }
    return (
        <Tooltip title={toolTip} color='green'>
            <a href='#addToCard' role="button" onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className={product.quantity < 1 ? "text-danger" : "text-success"} />
                <br />
                {product.quantity < 1 ? 'Out of stock' : 'Add to Card'}
            </a>
        </Tooltip>
    )
}

export default AddToCart
