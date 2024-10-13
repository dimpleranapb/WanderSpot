const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Middleware to delete reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

listingSchema.virtual("averageRating").get(function () {
  // Ensure reviews are populated and have ratings
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    // Return the average, rounded to one decimal place
    return (totalRating / this.reviews.length).toFixed(1); 
  }
  return null; // Return null if no reviews exist
});

// Ensure virtual fields are serialized
listingSchema.set("toJSON", {
  virtuals: true,
});

// Create the Listing model
const Listing = mongoose.model("Listing", listingSchema); // Capitalized 'Listing' for model name
module.exports = Listing;
