import React from "react";
import { Card } from "antd";
import noImage from "../../images/no_image_available.png";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import AverageRating from "../modal/AverageRating";

function ProductCard({ product }) {
    const { title, images, description, product_id, slug } = product;
    return (
        <>
            <AverageRating product={product} />
            <Card
                bordered
                hoverable
                cover={
                    <img
                        style={{ height: "150px", objectFit: "cover" }}
                        alt={product_id}
                        src={images && images.length ? images[0].url : noImage}
                        className="p-1"
                    />
                }
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-warning" />
                        <br />
          View Product
        </Link>,

                    <>
                        <ShoppingCartOutlined className="text-danger" />
                        <br />
          Add to Card
        </>,
                ]}
            >
                <Card.Meta
                    title={title}
                    description={`${description.substring(0, 40)} ...`}
                />
            </Card>
        </>
    );
}

export default ProductCard;
