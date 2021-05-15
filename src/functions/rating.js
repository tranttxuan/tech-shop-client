export const showAverage = (product) => {
    if (product && product.ratings) {
        let length = product.ratings.length;
        let sum = product.ratings.reduce((acc, rating) => {
            return acc + Number(rating.star);
        }, 0);
        return length !== 0 ? sum/length : 0;
    }
    return 0;
}