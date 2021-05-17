import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import ProductCard from '../../../components/cards/ProductCard';
import { getSub } from '../../../functions/sub';


function SubPage() {
    let { slug } = useParams();
    const [subs, setSubs] = useState({});
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        getSub(slug)
            .then(sub => {
                console.log(sub.data)
                setSubs(sub.data.sub);
                setProducts(sub.data.products);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }, [slug]);

    return (
        <div className="container">
            {loading
                ? <h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4 "><LoadingOutlined />Loading ....</h4>
                : <h4 className="jumbotron text-center p-3 mt-5 mb-5 display-4 ">{products.length} Products in "{subs.name}" category</h4>
            }
            <div className="row">
                {products.map(prod => (
                    <div className="col-md-4" key={prod._id}>
                        <ProductCard product={prod} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubPage;
