import { StarOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router';
import StarRatings from "react-star-ratings";
import { toast } from 'react-toastify';

function RatingModal({ children }) {
    const user = useSelector(state => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const history = useHistory();
    const {slug} = useParams();

    const handleModal = () => {
        if (user && user.token) {
            setIsModalVisible(true);
        } else {
            history.push({
                pathname:'/login',
                state:{from: `/product/${slug}`,}
            });
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        toast.success('Thank you for your review');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div onClick={handleModal}>
                <StarOutlined className='text-danger' />
                <br />
                {user ? 'Leave rating' : 'Login to leave rating'}
            </div>
            <Modal
                title="Leave your rating"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    )
}

export default RatingModal
