import React from "react";

const IyteCarRideList = () => {
  const rides = [
    {
      id: 1,
      driver: "John Doe",
      departure: "Izmir",
      destination: "Istanbul",
      date: "2024-08-18",
      seats: 3,
      price: "50 TL",
    },
    {
      id: 2,
      driver: "Jane Smith",
      departure: "Ankara",
      destination: "Bursa",
      date: "2024-08-19",
      seats: 2,
      price: "60 TL",
    },
  ];

  return (
    <div className="container mt-4">
      {rides.map((ride) => (
        <div className="card mb-3 shadow-sm" key={ride.id}>
          <div className="row g-0">
            <div className="col-md-8 p-3">
              <h5 className="card-title">
                <i className="bi bi-arrow-right-circle"></i> {ride.departure} to{" "}
                {ride.destination}
              </h5>
              <p className="card-text">Driver: {ride.driver}</p>
              <p className="card-text">Date: {ride.date}</p>
              <p className="card-text">Seats Available: {ride.seats}</p>
              <p className="card-text">Price: {ride.price}</p>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
              <button className="btn btn-success rounded-pill">
                <i className="bi bi-check-circle"></i> Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IyteCarRideList;
