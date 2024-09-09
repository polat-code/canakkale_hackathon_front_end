import React, { useState } from "react";

const PlacesList = () => {
  // Fake data for restaurants
  const restaurants = [
    {
      id: "1",
      name: "Cafeteria 1",
      openStarted: "08:00",
      openStop: "20:00",
      telephoneNumber: "123-456-7890",
    },
    {
      id: "2",
      name: "Cafeteria 2",
      openStarted: "09:00",
      openStop: "22:00",
      telephoneNumber: "098-765-4321",
    },
    {
      id: "3",
      name: "Cafeteria 3",
      openStarted: "07:00",
      openStop: "19:00",
      telephoneNumber: "555-123-4567",
    },
    {
      id: "4",
      name: "Cafeteria 4",
      openStarted: "10:00",
      openStop: "23:00",
      telephoneNumber: "444-987-6543",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">University Restaurants</h1>

      {/* Search bar */}
      <div className="row mb-4">
        <div className="col-md-8 col-sm-10 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search restaurants by name..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4 col-sm-2">
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-lg-4 col-md-6 mb-4" key={restaurant.id}>
            <div
              className="card h-100 shadow-lg"
              style={{
                borderRadius: "15px",
                border: "2px solid #007bff", // Add a border color
                backgroundColor: "#f8f9fa", // Light background color
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              <div className="card-body text-center">
                <h5
                  className="card-title"
                  style={{
                    fontWeight: "bold",
                    color: "#007bff", // Change text color
                  }}
                >
                  {restaurant.name}
                </h5>
                <p className="card-text">
                  <strong>Open:</strong> {restaurant.openStarted} -{" "}
                  {restaurant.openStop}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {restaurant.telephoneNumber}
                </p>
              </div>
              <div className="card-footer bg-transparent text-center">
                <button
                  className="btn btn-outline-primary w-75"
                  style={{
                    borderRadius: "20px", // Rounded button
                    fontWeight: "bold",
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;
