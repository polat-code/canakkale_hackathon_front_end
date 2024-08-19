import React, { useState } from "react";

const CreateMatch = () => {
  const [sport, setSport] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [playersNeeded, setPlayersNeeded] = useState(0);

  const handleCreateMatch = () => {
    // Handle match creation logic
    console.log({ sport, time, location, playersNeeded });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create a Match</h2>
      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Sport</label>
          <select
            className="form-select"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="">Select Sport</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Players Needed</label>
          <input
            type="number"
            className="form-control"
            value={playersNeeded}
            onChange={(e) => setPlayersNeeded(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleCreateMatch}>
          Create Match
        </button>
      </div>
    </div>
  );
};

export default CreateMatch;
