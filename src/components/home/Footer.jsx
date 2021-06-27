import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons'
import React from 'react';
import "./Banner.css"

function Footer() {
    return (
        <footer style={{ backgroundColor: '#f2f2f2' }}>
            <div class="container pt-5 pb-5">
                <div class="row">
                    <div class="col-6 col-md-3">
                        <h3>Products</h3>
                        <ul>
                            <li><a href="/">Help center</a></li>
                            <li><a href="/">Contact us</a></li>
                            <li><a href="/">Product help</a></li>
                            <li><a href="/">Warranty</a></li>
                            <li><a href="/">Order status</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md-3">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="/">Help center</a></li>
                            <li><a href="/">Contact us</a></li>
                            <li><a href="/">Product help</a></li>
                            <li><a href="/">Warranty</a></li>
                            <li><a href="/">Order status</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md-3">
                        <h3 >Support</h3>
                        <ul>
                            <li><a href="/">Help center</a></li>
                            <li><a href="/">Contact us</a></li>
                            <li><a href="/">Product help</a></li>
                            <li><a href="/">Warranty</a></li>
                            <li><a href="/">Order status</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md-3 col-sm-12">
                        <div class="contact">
                            <h3 class="contact-header">
                                Tech Shop
                            </h3>
                            <p>
                                <span><a href="/"><YoutubeOutlined /></a></span>{" "}
                                <span><a href="/"><FacebookOutlined /></a></span>{" "}
                                <span><a href="/"><InstagramOutlined /></a></span>
                            </p>
                        </div>
                        <div class="subscribe">
                            <input  className="form-control" type="email" placeholder="ENTER YOUR EMAIL" />
                            <button className='btn btn-primary'>subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer
