import { Card } from "antd";
import React from "react";
import { HeartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import noImage from "../../images/no_image_available.png";
import ProductDetails from "./ProductDetails";
import { Tabs } from "antd";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import AverageRating from "../modal/AverageRating";
import AddToCart from "../forms/AddToCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist } from "../../functions/user";

const { TabPane } = Tabs;

function SingleProduct({ product, onStarClick, star }) {
    const { title, description, images, _id } = product;
    const history = useHistory();
    const user = useSelector(state => state.user)

    const handleTabs = () => { };

    const handleAddToWishlist = () => {
        addToWishlist(product._id, user.token)
            .then(res => {
                toast.success('Add to wishlist');
                history.push("/user/wishlist");
            })
            .catch(err => toast.error('Not added this product to wishlist'))
    }

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images.map((image, id) => (
                            <img src={image.url} key={image.public_id} alt={`product-${id}`} />
                        ))}
                    </Carousel>
                ) : (
                    <Card
                        cover={<img src={noImage} className="p-1 card-image" alt="no-img" />}
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
                        <AddToCart product={product} />,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" />
                            <br />
							Add to Wishlist
						</a>,
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
