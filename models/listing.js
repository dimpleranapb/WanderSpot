const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title :{
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D link",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D link" : v,
    },
    price: Number,
    location: String,
    country: String,

});

const Listing = mongoose.model("listing", listingSchema);
module.exports = Listing;