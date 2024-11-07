const Listing = require("../Model/listing");

// Creating a new listing
const createListing = async (req, res) => {
  const {
    title,
    description,
    propertyType,
    regularPrice,
    discountPrice,
    images,
    location,
    amenities,
    bedrooms,
    bathrooms,
    area,
  } = req.body;

  try {
    const listing = await Listing.create({
      title,
      description,
      propertyType,
      regularPrice,
      discountPrice,
      images,
      location,
      amenities,
      bedrooms,
      bathrooms,
      area,
      listedBy: req.user.id,
    });

    return res
      .status(201) // Use 201 for successful creation
      .send({ msg: "Listing created successfully.", listing });
  } catch (err) {
    return res.status(500).send({
      msg: "Internal Server error, can't create listing!",
      Error: err.message,
    });
  }
};

// Updating Listing
const updateListing = async (req, res) => {
  const {
    title,
    description,
    propertyType,
    regularPrice,
    discountPrice,
    images,
    location,
    amenities,
    bedrooms,
    bathrooms,
    area,
  } = req.body;

  try {
    const id = req.params.id;
    let listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).send({ msg: "Listing not found!" });
    }

    // Check if user is authorized
    if (listing.listedBy.toString() !== req.user.id) {
      return res.status(403).send({ msg: "User not authorized" });
    }

    // Update the listing
    listing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        propertyType,
        regularPrice,
        discountPrice,
        images,
        location,
        amenities,
        bedrooms,
        bathrooms,
        area,
      },
      { new: true } // Return the updated document
    );

    return res
      .status(200)
      .send({ msg: "Listing updated successfully", listing });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send({ msg: "Listing not found" });
    }
    return res
      .status(500)
      .send({ msg: "Internal server error!", Error: err.message });
  }
};

// Deleting Listing
const deleteListing = async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send({ msg: "Listing not found!" });
    }

    // Check if user is authorized
    if (listing.listedBy.toString() !== req.user.id) {
      return res.status(403).send({ msg: "User not authorized" });
    }

    // Delete the listing
    await Listing.findByIdAndDelete(id);
    return res.status(200).send({ msg: "Listing deleted successfully." });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "Internal server error!", Error: err.message });
  }
};

// Get a single listing
const getListing = async (req, res) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id).populate(
      "listedBy",
      "name email"
    );
    if (!listing) {
      return res.status(404).send({ msg: "Listing not found" });
    }
    return res
      .status(200)
      .send({ msg: "Listing fetched successfully.", listing });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send({ msg: "Listing not found" });
    }
    return res
      .status(500)
      .send({ msg: "Internal server error!", Error: err.message });
  }
};

// Get all the listings
const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("listedBy", "name email");
    return res
      .status(200)
      .send({ msg: "Listings fetched successfully.", listings });
  } catch (err) {
    return res
      .status(500)
      .send({ msg: "Internal server error!", Error: err.message });
  }
};

const getFilteredListings = async (req, res) => {
  const { location, minPrice, maxPrice, propertyType } = req.query;

  // Build the query object
  const query = {};

  if (propertyType) {
    query.propertyType = propertyType;
  }
  if (minPrice) {
    query.regularPrice = { $gte: Number(minPrice) };
  }
  if (maxPrice) {
    query.regularPrice = {
      ...query.regularPrice,
      $lte: Number(maxPrice),
    };
  }
  if (location) {
    // Assuming location is a string and can be partially matched
    query.location = { $regex: location, $options: 'i' }; // Case-insensitive search
  }

  try {
    // Fetch filtered listings from the database
    const listings = await Listing.find(query).populate("listedBy", "name email");

    // Return the listings with a success message
    return res.status(200).json({ msg: "Listings fetched successfully.", listings });
  } catch (err) {
    // Handle errors and return an appropriate response
    return res.status(500).json({ msg: "Internal server error!", Error: err.message });
  }
};


module.exports = {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  getFilteredListings
};
