import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/seller.css';
import { API_URL } from '../utils/api';  

const Seller = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login'); 
          return;
        }

        const response = await axios.get(`${API_URL}/listings`, {  
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListings(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching listings:', error.response ? error.response.data : error.message);
        setError('Failed to fetch listings. Please try again later.');
        
       
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');  
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [navigate]);  

  const handleCreateListing = () => {
    navigate('/NewListing');
  };

  if (isLoading) {
    return <div className="listings-div">Loading...</div>;
  }

  if (error) {
    return <div className="listings-div">
      <p className="error-message">{error}</p>
      <button className="create-btn" onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>;
  }

  return (
    <div className='listings-div'>
      <h1 className='my-listings'>My Listings</h1>

      {listings.length > 0 ? (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>  {/* Changed id to _id if using MongoDB */}
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <p>Regular Price: ${listing.regularPrice}</p>
              {listing.discountPrice && (
                <p>Discount Price: ${listing.discountPrice}</p>
              )}
              <p>Location: {listing.location.city}, {listing.location.state}</p>
              <p>Property Type: {listing.propertyType}</p>
              <p>Bedrooms: {listing.bedrooms} | Bathrooms: {listing.bathrooms}</p>
              <p>Area: {listing.area} sq ft</p>
              {listing.amenities && listing.amenities.length > 0 && (
                <p>Amenities: {listing.amenities.join(', ')}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No listings found. Create your first listing!</p>
      )}

      <button className='create-btn' onClick={handleCreateListing}>
        Create New Listing
      </button>
    </div>
  );
};

export default Seller;