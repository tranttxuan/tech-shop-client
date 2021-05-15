import React from 'react'
import StarRatings from 'react-star-ratings';
import { showAverage } from '../../functions/rating';

function AverageRating({product}) {
    let average =( product && product.ratings )? showAverage(product) : 0;
    return (
        <div className='text-center pt-1 pb-3'>
            {average !== 0
                ? <>
                    <StarRatings
                        starDimension='20px'
                        starSpacing='2px'
                        allowHalf
                        rating={average}
                        starRatedColor='red'
                        numberOfStars={5}
                        editing={false}
                    />{' '}({product.ratings.length})
                </>
                : 'No rating yet'}
        </div>
    )
}

export default AverageRating
