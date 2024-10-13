// utils/ratingUtils.js
module.exports.calculateAverageRatings = (listings) => {
    return listings.map(listing => {
      const totalRating = listing.reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = listing.reviews.length ? totalRating / listing.reviews.length : 0; // Avoid division by zero
      return {
        ...listing.toObject(), // Convert mongoose document to plain object
        averageRating: averageRating.toFixed(1), // Set average rating
      };
    });
  };
  