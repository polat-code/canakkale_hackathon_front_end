import React from "react";
import { Link } from "react-router-dom";

const IyteCarSearchBar = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Departure City"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Destination City"
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100 rounded-pill">
              <i className="bi bi-search"></i> Search
            </button>
          </div>
          <div className="col-md-3">
            <Link
              to="/iyte-car/create-ride"
              className="btn btn-success w-100 rounded-pill"
            >
              <i className="bi bi-plus-circle"></i> Create Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IyteCarSearchBar;
