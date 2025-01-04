import React, { useState } from "react";

const MatchSearch = ({
  filterLevel,
  setFilterLevel,
  filterGender,
  setFilterGender,
  filterSport,
  setFilterSport,
}) => {
  return (
    <div className="mb-4">
      <div className="row mb-3">
        <div className="col-md-4 mt-3 mt-lg-0">
          <select
            className="form-select"
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
          >
            <option value="ALL">Bütün Sporlar</option>
            <option value="FOOTBALL">Futbol</option>
            <option value="BASKETBALL">Basketbol</option>
            <option value="VOLLEYBALL">Voleybol</option>
            <option value="TENNIS">Tenis</option>
          </select>
        </div>
        <div className="col-md-4 mt-2 mt-lg-0">
          <select
            className="form-select"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="ALL">Bütün Seviyeler</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        <div className="col-md-4 mt-2 mt-lg-0">
          <select
            className="form-select"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value="ALL">Hepsi</option>
            <option value="ANY">Farketmez</option>
            <option value="MALE">Erkek</option>
            <option value="FEMALE">Kız</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MatchSearch;
