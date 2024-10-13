const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateListing, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

// Configure multer for file uploads
const upload = multer({ storage });

// Search route
router.get("/search", wrapAsync(listingController.searchListings));
// Route to get all listings and create a new listing
router
  .route("/")
  .get(wrapAsync(listingController.index)) 
  .post(
    isLoggedIn, // Ensure user is logged in
    upload.single("listing[image]"), // Handle file upload
    validateListing, // Validate the listing data
    wrapAsync(listingController.createListing) // Create a new listing
  );

// Route to render the form for creating a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Route for individual listings based on their ID
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show a specific listing
  .put(
    isLoggedIn, // Ensure user is logged in
    isOwner, // Check if the user is the owner of the listing
    upload.single("listing[image]"), // Handle file upload
    validateListing, // Validate the listing data
    wrapAsync(listingController.updateListing) // Update the listing
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete the listing

// Route to render the edit form for a specific listing
router.get(
  "/:id/edit",
  isLoggedIn, // Ensure user is logged in
  isOwner, // Check if the user is the owner of the listing
  wrapAsync(listingController.renderEditForm) // Render the edit form
);

module.exports = router;
