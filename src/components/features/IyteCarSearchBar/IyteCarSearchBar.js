import React, { useState } from "react";
import { cityData } from "../../../utils/CityData/cityData";

const IyteCarSearchBar = () => {
  const [isCityInside, setIsCityInside] = useState(true);
  const [isCityOutside, setIsCityOutside] = useState(false);
  const [departurePlace, setDeparturePlace] = useState(
    cityData.cityInside.districts
  );
  const [destinationPlace, setDestinationPlace] = useState(
    cityData.cityInside.districts
  );

  const handleCityInside = () => {
    setIsCityInside(true);
    setIsCityOutside(false);
    setDestinationPlace(cityData.cityInside.districts);
    setDeparturePlace(cityData.cityInside.districts);
  };
  const handleCityOutside = () => {
    setIsCityInside(false);
    setIsCityOutside(true);
    setDestinationPlace(cityData.cityOutside.districts);
    setDeparturePlace(cityData.cityOutside.districts);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <select
              className="form-select"
              id="citySelection"
              onChange={(e) => {
                if (e.target.value === "INCITY") {
                  handleCityInside();
                } else if (e.target.value === "OUTCITY") {
                  handleCityOutside();
                }
              }}
            >
              <option value="INCITY">İzmir içi Seyahat</option>
              <option value="OUTCITY">İzmir dışı Seyahat</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" id="departureCity">
              {departurePlace.map((district) => {
                return <option value={district}>{district}</option>;
              })}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" id="destinationCity">
              {departurePlace.map((district) => {
                return <option value={district}>{district}</option>;
              })}
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100 rounded-pill">
              <i className="bi bi-search"></i> Search
            </button>
          </div>
          {/* <div className="col-md-3">
            <Link
              to="/iyte-car/create-ride"
              className="btn btn-success w-100 rounded-pill"
            >
              <i className="bi bi-plus-circle"></i> Create Ride
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default IyteCarSearchBar;
