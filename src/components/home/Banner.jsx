import React, { useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image1 from '../../assets/image-3.webp';
import Image3 from '../../assets/image-3.png';
import Image4 from '../../assets/image-4.jpeg';
import { Link } from 'react-router-dom';
import "./Banner.css"


function Banner() {
    const [active, setActive] = useState(0);

    const selectedItem = (e) => {
        setActive(e)
    }
    return (
        <div style={{ backgroundColor: '#f2f2f2' }}>
            <div className='container pt-3 pb-3'>
                <Carousel showThumbs={false}
                    interval={5000}
                    infiniteLoop
                    autoPlay
                    onChange={selectedItem}
                    showStatus={false}
                >
                    <div className={`row slide ${active === 0 && 'active'}`} >
                        <div className='col-md-4 d-flex justify-content-center align-items-start flex-column text-left mt-5 mb-5'>
                            <h2 className='top-down trans-delay-0-2'>Make everything easy</h2>
                            <h2 className='top-down trans-delay-0-2'>on the eyes</h2>
                            <h5 className='top-down trans-delay-0-4'>MAC PRO</h5>
                            <Link to='/shop' className='top-down trans-delay-0-6'>
                                <button className='btn btn-primary btn-raised'>Shop now</button>
                            </Link>
                        </div>
                        <div className='col-md-8 top-down right-left'>
                            <img src={Image3} style={{ objectFit: 'scale-down' }} alt='banner-1'/>
                        </div>
                    </div>

                    <div className={`row slide ${active === 1 && 'active'}`}>
                        <div className='col-md-8 top-down left-right'>
                            <img src={Image1} style={{ objectFit: 'scale-down' }} alt='banner-2'/>
                        </div>
                        <div className='col-md-4 d-flex justify-content-center align-items-start flex-column text-left mt-5 mb-5'>
                            <h2 className='top-down trans-delay-0-2'>Finishing touches</h2>
                            <h5 className='top-down trans-delay-0-4'>and essentials</h5>
                            <Link to='/shop' className='top-down trans-delay-0-6'>
                                <button className='btn btn-primary btn-raised'>Shop now</button>
                            </Link>
                        </div>
                    </div>

                    <div className={`row slide ${active === 2 && 'active'}`}>
                        <div className='col-md-4 d-flex justify-content-center align-items-start flex-column text-left mt-5 mb-5'>
                            <h2 className='top-down trans-delay-0-2'>Workspaces That</h2>
                            <h2 className='top-down trans-delay-0-2'>Work for You</h2>
                            <h5 className='top-down trans-delay-0-4'>Personalize your space with</h5>
                            <h5 className='top-down trans-delay-0-4'>accessories certified for Microsoft Teams</h5>
                            <Link to='/shop' className='top-down trans-delay-0-6'>
                                <button className='btn btn-primary btn-raised'>Shop now</button>
                            </Link>
                        </div>
                        <div className='col-md-8 top-down'>
                            <img src={Image4} style={{ objectFit: 'scale-down' }} alt='banner-3'/>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Banner
