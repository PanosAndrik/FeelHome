import React, { useState } from "react";
import "../styles/Home.css";
import Searchbar from "../components/Shared/Searchbar.jsx";
import SearchResults from "../components/Shared/SearchResults.jsx"; 

function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = (searchQuery) => {
    // Random results
    const dummyResults = [
      {
        title: "Modern Apartment in City Center",
        location: searchQuery.location,
        rent: "$1200/month",
        apartmentType: searchQuery.apartment,
        description: "A beautiful modern apartment with stunning views."
      },
      {
        title: "Cozy Studio in the Suburbs",
        location: "Suburbs",
        rent: "$800/month",
        apartmentType: "Studio",
        description: "Affordable and cozy studio perfect for singles."
      }
    ];

    // Filter results based on search query if you want to simulate searching logic
    const filteredResults = dummyResults.filter(result => {
      return (
        result.location.toLowerCase().includes(searchQuery.location.toLowerCase()) &&
        result.rent.includes(searchQuery.rent) &&
        result.apartmentType.toLowerCase().includes(searchQuery.apartment.toLowerCase())
      );
    });

    setResults(filteredResults); // Set the search results
  };

  return (
    <div>
      <div className="background-container">
        <h1 className="headers h1">Simply Feel at Home</h1>
        <h2 className="headers h2">The No. 1 Real Estate</h2>
        <Searchbar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
        <SearchResults results={results} />
      </div>
    </div>
  );
}

export default Home;
