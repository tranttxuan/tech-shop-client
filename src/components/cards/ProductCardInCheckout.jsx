import React from 'react';
import ModalImage from "react-modal-image";
import noImage from "../../images/no_image_available.png";

function ProductCardInCheckout({ product }) {
    return (
        <tr>
            <td>
                <div style={{width:"100px", height:"100px"}}>
                    {product.images.length
                        ? <ModalImage
                            small={product.images[0].url}
                            large={product.images[0].url}
                            alt={product.title} />
                        : <img src={noImage} />}
                </div>


            </td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.brand}</td>
            <td>{product.color}</td>
            <td>{product.count}</td>
            <td>{ }</td>
            <td>{ }</td>
        </tr>
    )
}

export default ProductCardInCheckout
