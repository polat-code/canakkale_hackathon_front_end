import React, { useState } from "react";

const IyteCarCreateRide = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle ride creation logic here
    console.log({ departure, destination, date, seats, price });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Create a Ride</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Departure City</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Destination City</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Number of Seats</label>
            <input
              type="number"
              className="form-control rounded-pill"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            <i className="bi bi-plus-circle"></i> Create Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default IyteCarCreateRide;
