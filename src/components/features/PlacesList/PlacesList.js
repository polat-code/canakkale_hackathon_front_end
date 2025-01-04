import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const PlacesList = ({ places }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(places);
  const navigate = useNavigate();

  // Search işlemi, searchQuery değiştiğinde tetiklenir
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRestaurants(places); // Tüm listeyi göster
    } else {
      const filtered = places.filter((restaurant) =>
        restaurant.placeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [searchQuery, places]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4 mb-lg-2 ">
        <button className="btn btn-success">Mekan Tavsiye Et</button>
      </div>
      <h1 className="text-center mb-4">Üniversite Mekan Rehber</h1>

      {/* Search bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6 col-sm-10 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Mekan ismine göre ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Search query güncellenir
          />
        </div>
      </div>

      {/* Restaurant listesi */}
      <div className="row">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((place) => (
            <div className="col-lg-4 col-md-6 mb-4" key={place.id}>
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
                    {place.placeName}
                  </h5>
                  <p className="card-text">
                    <strong>Open:</strong> {place.openStart} - {place.openEnd}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {place.phone}
                  </p>
                </div>
                <div className="card-footer bg-transparent text-center">
                  <button
                    className="btn btn-outline-primary w-75"
                    style={{
                      borderRadius: "20px", // Rounded button
                      fontWeight: "bold",
                    }}
                    onClick={() =>
                      navigate("/places/detail?placeId=" + place.id)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default PlacesList;
