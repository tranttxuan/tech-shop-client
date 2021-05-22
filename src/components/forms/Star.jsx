import React from 'react'
import StarRatings from 'react-star-ratings'

function Star({ starClick, numberOfStars }) {
    return (
        <>
            <StarRatings
                starDimension='20px'
                starSpacing='2px'
                numberOfStars={numberOfStars}
                editing={false}
                // starHoverColor='red'
                starEmptyColor='red'
                changeRating={() => starClick(numberOfStars)}
            />
        </>
    )
}

export default Star
