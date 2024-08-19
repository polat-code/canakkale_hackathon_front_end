import React, { useState } from "react";

const MatchSearch = ({ matches, setMatches }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterSport, setFilterSport] = useState("");

  const handleSearch = () => {
    const filteredMatches = matches.filter(
      (match) =>
        (match.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterLevel === "" || match.level === filterLevel) &&
        (filterGender === "" || match.gender === filterGender) &&
        (filterSport === "" || match.sport === filterSport)
    );
    setMatches(filteredMatches);
  };

  return (
    <div className="mb-4">
      <div className="row mb-3">
        <div className="col-md-4 mt-3 my-lg-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search by sport or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2 mt-3 mt-lg-0">
          <select
            className="form-select"
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
          >
            <option value="">All Sports</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Volleyball">Volleyball</option>
          </select>
        </div>
        <div className="col-md-2 mt-2 mt-lg-0">
          <select
            className="form-select"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="col-md-2 mt-2 mt-lg-0">
          <select
            className="form-select"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="">Any Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Any">Any</option>
          </select>
        </div>
        <div className="col-md-2 mt-2 mt-lg-0">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchSearch;
