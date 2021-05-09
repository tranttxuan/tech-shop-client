import React from "react";
import { Card } from "antd";
import noImage from "../../images/no_image_available.png";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function AdminProductCard({ product, handleDeleteProduct }) {
  const { title, images, description, product_id, slug } = product;
  return (
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
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleDeleteProduct(slug)}
        />,
      ]}
    >
      <Card.Meta
        title={title}
        description={`${description.substring(0, 40)} ...`}
      />
    </Card>
  );
}

export default AdminProductCard;
