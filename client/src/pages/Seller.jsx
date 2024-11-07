import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/seller.css'

const Seller = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  // Fetch listings when component loads
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:4040/listings', {
          headers: {
            Authorization: `Bearer ${token}`, // If the API requires authentication
          },
        });
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error.response ? error.response.data : error.message);
      }
    };

    fetchListings();
  }, []);

  const handleCreateListing = () => {
    navigate('/NewListing');
  };

  return (
    <div className='listings-div'>
      <h1 className='my-listings'>My Listings:</h1>

      {/* Show listings */}
      {listings.length > 0 ? (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p>Price: {listing.price}</p>
              <p>Location: {listing.location.city}, {listing.location.state}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listings found.</p>
      )}

      <button className='create-btn' onClick={handleCreateListing}>Create New Listing</button>
    </div>
  )
}

export default Seller