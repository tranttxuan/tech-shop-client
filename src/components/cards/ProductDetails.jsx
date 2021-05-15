import React from "react";
import { Link } from "react-router-dom";

function ProductDetails({ product }) {
    const {
        color,
        shipping,
        brand,
        sold,
        quantity,
        price,
        category,
        subs,
    } = product;
    const stock = Number(quantity) - Number(sold);
    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "}
                <span className="font-weight-bold pull-xs-right ">
                    $ {price}
                </span>
            </li>

            {category && (
                <li className="list-group-item">
                    Category
                    <Link
                        to={`/category/${category.slug}`}
                        className="font-weight-bold pull-xs-right "
                    >
                        {category.name}
                    </Link>
                </li>
            )}

            {subs && subs.length !== 0 && (
                <li className="list-group-item">
                    Sub Category
                    {subs.map((sub) => (
                        <Link
                            to={`/sub/${sub.slug}`}
                            key={sub.slug}
                            className="font-weight-bold pull-xs-right "
                        >
                            {sub.name}
                        </Link>
                    ))}
                </li>
            )}
            <li className="list-group-item">
                Shipping{" "}
                <span className="font-weight-bold pull-xs-right ">
                    {shipping}
                </span>
            </li>
            <li className="list-group-item">
                Color{" "}
                <span className="font-weight-bold pull-xs-right ">{color}</span>
            </li>
            <li className="list-group-item">
                Brand{" "}
                <span className="font-weight-bold pull-xs-right ">{brand}</span>
            </li>
            <li className="list-group-item">
                Sold{" "}
                <span className="font-weight-bold pull-xs-right ">{sold}</span>
            </li>
            <li className="list-group-item">
                Status
                {stock > 0 ? (
                    <span className="font-weight-bold pull-xs-right text-success">
                        In Stock
                    </span>
                ) : (
                    <span className="font-weight-bold pull-xs-right text-danger">
                        Out of Stock
                    </span>
                )}
            </li>
        </ul>
    );
}

export default ProductDetails;
