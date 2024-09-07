import React, { useState } from "react";

const CreateMatch = () => {
  const [sport, setSport] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [playersNeeded, setPlayersNeeded] = useState(0);

  const handleCreateMatch = () => {
    // Handle match creation logic
    // console.log({ sport, time, location, playersNeeded });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Maç İlanı Ver</h2>
      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Spor</label>
          <select
            className="form-select"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="Football">Futbol</option>
            <option value="Basketball">Basketbol</option>
            <option value="Volleyball">Voleybol</option>
            <option value="Tennis">Tenis</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Oyun Seviyesi</label>
          <select
            className="form-select"
            //value={sport}
            //onChange={(e) => setSport(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tarih</label>
          <input
            type="date"
            className="form-control"
            //value={time}
            //onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Saat</label>
          <input
            type="time"
            className="form-control"
            //value={time}
            //onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Maç Konumu - Saha</label>
          <input
            type="text"
            className="form-control"
            //value={location}
            //onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gerekli Oyuncu Sayısı</label>
          <input
            type="number"
            className="form-control"
            //value={playersNeeded}
            //onChange={(e) => setPlayersNeeded(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cinsiyet Tercihi</label>
          <select
            className="form-select"
            //value={sport}
            //onChange={(e) => setSport(e.target.value)}
          >
            <option value="Male">Erkek</option>
            <option value="Female">Kız</option>
            <option value="Any">Farketmez</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Telefon (ülke koduyla ) Örnek : +90553 123 4536
          </label>
          <input
            type="tel"
            className="form-control"
            //value={price}
            //onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Açıklama</label>
          <textarea
            type="text"
            className="form-control"
            //value={price}
            //onChange={(e) => setPrice(e.target.value)}
            //Don't forget the restriction of the number of character
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
