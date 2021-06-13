import React from "react";
import { Card } from "antd";
import noImage from "../../images/no_image_available.png";
import { Link } from "react-router-dom";
import { EyeOutlined} from "@ant-design/icons";
import AverageRating from "../modal/AverageRating";
import AddToCart from "../forms/AddToCart";

function ProductCard({ product }) {
    const { title, images,price, description, product_id, slug } = product;

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
                    <AddToCart product={product}/>,
                ]}
            >
                <Card.Meta
                    title={`${title} - $${price}`}
                    description={`${description.substring(0, 40)} ...`}
                />
            </Card>
        </>
    );
}

export default ProductCard;
