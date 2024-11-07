import React, { useState } from 'react';
import axios from 'axios';
import "../styles/newlisting.css"

const newlisting = () => {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    regularPrice: "",
    discountPrice: "",
    images: [], 
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    amenities: [],
    bedrooms: "",
    bathrooms: "",
    area: ""
  });

  const [listingId, setListingId] = useState(null); 

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    
    
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      amenities: value.split(',').map(item => item.trim()) 
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).map(file => URL.createObjectURL(file)); 
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleDelete = async () => {
    if (!listingId) {
      alert("Please provide a listing ID to delete.");
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login or sign up.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:4040/listings/delete/${listingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Listing deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting listing:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Please login or sign up.");
      return;
    }

    try {
      const form = new FormData();
      
      // Append form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key === 'location') {
          Object.keys(formData.location).forEach((subKey) => {
            form.append(`location.${subKey}`, formData.location[subKey]);
          });
        } else if (key === 'amenities') {
          formData.amenities.forEach((item) => {
            form.append('amenities[]', item); // Note: use 'amenities[]' to send as array
          });
        } else if (key === 'images') {
          formData.images.forEach((file) => {
            form.append('images', file); // Handle image files
          });
        } else {
          form.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        'http://localhost:4040/listings/create',
        form,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Listing created successfully:', response.data);
      alert('Listing created successfully')
    } catch (error) {
      console.error('Error creating listing:', error.response ? error.response.data : error.message);
      alert('Error creating listing!')
    }
  };

  return (
    <form id="seller-form" onSubmit={handleSubmit}>
      <h2 id="seller-form-title">Create New Listing</h2>

      <label htmlFor="seller-title">Title:</label>
      <input
        id="seller-title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-description">Description:</label>
      <textarea
        id="seller-description"
        name="description"
        value={formData.description}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-propertyType">Property Type:</label>
      <select
        id="seller-propertyType"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleUpdate}
        required
      >
        <option value="">Select Type</option>
        <option value="Apartment">Apartment</option>
        <option value="House">House</option>
        <option value="Condo">Condo</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Land">Land</option>
      </select>

      <label htmlFor="seller-regularPrice">Regular Price:</label>
      <input
        id="seller-regularPrice"
        type="number"
        name="regularPrice"
        value={formData.regularPrice}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-discountPrice">Discount Price:</label>
      <input
        id="seller-discountPrice"
        type="number"
        name="discountPrice"
        value={formData.discountPrice}
        onChange={handleUpdate}
        required
      />

      {/* Location Fields */}
      <label htmlFor="seller-location-address">Address:</label>
      <input
        id="seller-location-address"
        type="text"
        name="location.address"
        value={formData.location.address}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-location-city">City:</label>
      <input
        id="seller-location-city"
        type="text"
        name="location.city"
        value={formData.location.city}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-location-state">State:</label>
      <input
        id="seller-location-state"
        type="text"
        name="location.state"
        value={formData.location.state}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-location-country">Country:</label>
      <input
        id="seller-location-country"
        type="text"
        name="location.country"
        value={formData.location.country}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-location-zipCode">Zip Code:</label>
      <input
        id="seller-location-zipCode"
        type="text"
        name="location.zipCode"
        value={formData.location.zipCode}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-amenities">Amenities (comma separated):</label>
      <input
        id="seller-amenities"
        type="text"
        name="amenities"
        value={formData.amenities.join(', ')}
        onChange={handleAmenitiesChange}
      />

      <label htmlFor="seller-bedrooms">Bedrooms:</label>
      <input
        id="seller-bedrooms"
        type="number"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-bathrooms">Bathrooms:</label>
      <input
        id="seller-bathrooms"
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-area">Area (in sq ft):</label>
      <input
        id="seller-area"
        type="number"
        name="area"
        value={formData.area}
        onChange={handleUpdate}
        required
      />

      <label htmlFor="seller-images">Images:</label>
      <input
        id="seller-images"
        type="file"
        multiple
        onChange={handleImageUpload}
      />

      <div>
        <button id="seller-submit" type="submit">Create Listing</button>
        <button id="seller-delete" type="button" onClick={handleDelete}>
          Delete Listing (X)
        </button>
      </div>
    </form>
  );
};

export default newlisting;
