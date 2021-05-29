import React from 'react';
import ModalImage from "react-modal-image";
import noImage from "../../images/no_image_available.png";
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addProductToCart, removeProductToCart } from '../../actions/cartActions';
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

function ProductCardInCheckout({ product }) {
    const colorList = ['Black', 'Red', 'Blue', 'White', 'Brown', 'Silver'];

    const dispatch = useDispatch();

    const handleColorChange = (color) => {
        product.color = color;
        dispatch(addProductToCart(product));
    }

    const handleRemoveProductFromCart = () => {
        dispatch(removeProductToCart(product));
    }

    const handleQuantity = (e) => {
        let count = e.target.value;
        if (count > product.quantity) {
            toast.error(`Max availale quantity: ${product.quantity}`);
            return;
        }
        if(count <= 0){
            toast.info(`Please enter a quantity greater than 0`);
        }
        product.count = Number(count);
        dispatch(addProductToCart(product));
    }
    return (
        <tr>
            <td>
                <div style={{ width: "100px", height: "100px" }}>
                    {product.images.length
                        ? <ModalImage
                            small={product.images[0].url}
                            large={product.images[0].url}
                            alt={product.title} />
                        : <img alt={product.title} src={noImage} style={{ width: "100px", height: "100px" }}/>}
                </div>


            </td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.brand}</td>
            <td>
                <Select defaultValue={product.color ? `${product.color}` : 'Please Select'}
                    bordered={false}
                    style={{ width: 120 }}
                    onChange={handleColorChange}>
                    {colorList
                        .map(color =>
                            <Option value={color} key={color}>{color}</Option>
                        )}
                </Select>
            </td>
            <td className="text-center">
                <input
                    type="number"
                    min="1"
                    max={product.quantity}
                    className="form-control"
                    value={product.count}
                    onChange={handleQuantity}
                />
            </td>
            <td>
                {product.shipping === 'Yes'
                ? <CheckCircleOutlined className='text-success' />
                : <CloseCircleOutlined className='text-success' />
            }
            </td>
            <td><DeleteOutlined className='text-danger pointer' onClick={handleRemoveProductFromCart}/> </td>
        </tr>
    )
}

export default ProductCardInCheckout
