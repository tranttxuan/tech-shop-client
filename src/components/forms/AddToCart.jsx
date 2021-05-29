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
            <p role="button"  onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" />
                <br />
            Add to Card
        </p>
        </Tooltip>
    )
}

export default AddToCart
