import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link} from 'react-router-dom'
import { getSubs } from '../../functions/sub';
import LoadingCard from '../cards/LoadingCard';

function SubCategoryList() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs()
            .then(subs => {
                setSubs(subs.data);
                console.log(subs.data);
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
            SubCategories
        </h4>
        <div className="container">
            {loading ? (
                <LoadingCard count={3} />
            ) : (
                <div className="row">
                    {subs.length && subs.map((sub) => {
                        console.log(sub.slug);
                       return (
                            <div
                                key={sub._id}
                                className="col btn btn-outlined-primary bt-lg btn-block btn-raised m-3">
                                <Link to={`/sub/${sub.slug}`}>{sub.name}</Link>
                            </div>
                        )
                    }
                    )}
                </div>
            )}
        </div>
    </>
    )
}

export default SubCategoryList
