import React, { useState } from 'react';
import '../../styles/Searchbar.css'// Christina's css import
import PropTypes from 'prop-types';

function Searchbar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [apartment, setApartment] = useState('');


  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleRentChange = (e) => setRent(e.target.value);
  const handleApartmentChange = (e) => setApartment(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
  

    if (onSearch) {
      onSearch({ location, rent, apartment });
    } else {
      console.error('onSearch is not defined');
    }
  };

  return (
    <div className="searchbar-div">
      <form className='form' onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Search for location..."
          className='input-field'
        />

        <input
          type="text"
          value={rent}
          onChange={handleRentChange}
          placeholder="Enter rent range..."
          className='input-field'
        />

        <input
          type="text"
          value={apartment}
          onChange={handleApartmentChange}
          placeholder="Enter apartment type..."
          className='input-field'
        />

        <button className='search-btn' type="submit">Search</button>
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Searchbar;
