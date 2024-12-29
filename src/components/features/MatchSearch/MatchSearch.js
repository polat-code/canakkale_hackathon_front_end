import React, { useState } from "react";

const MatchSearch = ({ sports, setSports }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterSport, setFilterSport] = useState("");

  const handleSearch = () => {};

  return (
    <div className="mb-4">
      <div className="row mb-3">
        <div className="col-md-3 mt-3 mt-lg-0">
          <select
            className="form-select"
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
          >
            <option value="">Bütün Sporlar</option>
            <option value="Football">Futbol</option>
            <option value="Basketball">Basketbol</option>
            <option value="Volleyball">Voleybol</option>
            <option value="Tennis">Tenis</option>
          </select>
        </div>
        <div className="col-md-3 mt-2 mt-lg-0">
          <select
            className="form-select"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="">Bütün Seviyeler</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="col-md-3 mt-2 mt-lg-0">
          <select
            className="form-select"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="">Farketmez</option>
            <option value="Male">Erkek</option>
            <option value="Female">Kız</option>
          </select>
        </div>
        <div className="col-md-3 mt-2 mt-lg-0">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Ara
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchSearch;
