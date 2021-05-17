import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category'
import LoadingCard from '../cards/LoadingCard';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories()
            .then(cats => {
                setCategories(cats.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }, []);

    return (
        <>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Categories
            </h4>
            <div className="container">
                {loading ? (
                    <LoadingCard count={3} />
                ) : (
                    <div className="row">
                        {categories.length && categories.map((cat) => 
                                <div
                                    key={cat._id}
                                    className="col btn btn-outlined-primary bt-lg btn-block btn-raised m-3">
                                    <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                                </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default CategoryList
