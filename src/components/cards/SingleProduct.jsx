import { Card } from "antd";
import React from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import noImage from "../../images/no_image_available.png";
import ProductDetails from "./ProductDetails";
import { Tabs } from "antd";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import AverageRating from "../modal/AverageRating";

const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, star}) {
    const { title, description, images, _id } = product;

    const handleTabs = () => { };
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images.map((image) => (
                            <img src={image.url} key={image.public_id} />
                        ))}
                    </Carousel>
                ) : (
                    <Card
                        cover={<img src={noImage} className="p-1 card-image" />}
                    />
                )}
                <Tabs defaultActiveKey="1" onChange={handleTabs} type="Card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Please <Link to="/">contact us</Link> at{" "}
                        <a
                            href="tel:0109090909"
                            onclick="ga('send', 'event', { eventCategory: 'Contact', eventAction: 'Call', eventLabel: 'Mobile Button'});"
                        >
                            0109090909
						</a>{" "}
						to get more information about this product
					</TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3 text-white">{title}</h1>
                <AverageRating product={product} />
                <Card
                    bordered
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" />
                            <br />
							Add to Card
						</>,
                        <Link to={`/`}>
                            <HeartOutlined className="text-info" />
                            <br />
							Add to Wishlist
						</Link>,
                        <RatingModal>
                            <StarRatings
                                allowHalf
                                rating={star}
                                starRatedColor='blue'
                                numberOfStars={5}
                                name={_id}
                                changeRating={onStarClick}
                            />
                        </RatingModal>
                    ]}
                >
                    <ProductDetails product={product} />
                </Card>
            </div>
        </>
    );
}

export default SingleProduct;
