
import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = ({ results }) => {
  if (!results.length) {
    return(
    <div className="search-results-container">
     <p className='result-title'>No results found</p>
    </div>
    )
  }

  return (
    <div className="search-results-container">
      <h2 className='search-results-h2'>Search Results:</h2>
      <ul className="results-list">
        {results.map((result, index) => (
          <li key={index} className="result-item">
            <h3 className="result-title">{result.title}</h3>
            <p className="result-description">{result.description}</p>
            <p className="result-location">Location: {result.location}</p>
            <p className="result-rent">Rent: {result.rent}</p>
            <p className="result-apartment-type">Apartment Type: {result.apartmentType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      rent: PropTypes.string.isRequired,
      apartmentType: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchResults;
