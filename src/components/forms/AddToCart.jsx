import { ShoppingCartOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { addProductToCart } from '../../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

function AddToCart({ product }) {
    const [toolTip, setToolTip] = useState('Click to add');

    const dispatch = useDispatch();
    const user  = useSelector(state => state.user);

    const handleAddToCart = () => {
        setToolTip('Added');
        dispatch(addProductToCart({...product, count:1}));
    }
    return (
        <Tooltip title={toolTip} color='green'>
            <a href='#' onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" />
                <br />
            Add to Card
        </a>
        </Tooltip>
    )
}

export default AddToCart
