import React from 'react';

const StarRating = ({rating, maxRating = 5}) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        stars.push(
            <span key={i} style={{color: i <= rating ? 'gold' : 'lightgray'}}>
        ★
      </span>
        );
    }

    return <div>{stars}</div>;
};

export default StarRating;
