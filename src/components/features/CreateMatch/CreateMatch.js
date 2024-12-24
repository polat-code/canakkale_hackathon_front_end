import React, { useState } from "react";
import { createMatch } from "../../../services/MatchAPIService";

const CreateMatch = () => {
  const [sportType, setSportType] = useState("FOOTBALL");
  const [sportLevel, setSportLevel] = useState("BEGINNER");
  const [gender, setGender] = useState("MALE");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(0);
  const [location, setLocation] = useState("");
  const [playersNeeded, setPlayersNeeded] = useState(1);
  const [description, setDescription] = useState("");
  const [telephone, setTelephone] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMatch = async () => {
    // Handle match creation logic
    const response = await createMatch({
      sportType,
      sportLevel,
      gender,
      date,
      hours,
      location,
      playersNeeded,
      description,
      telephone,
    });

    if (response.statusCode === 200) {
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Maç İlanı Ver</h2>
      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Spor</label>
          <select
            className="form-select"
            value={sportType}
            onChange={(e) => setSportType(e.target.value)}
          >
            <option value="FOOTBALL">Futbol</option>
            <option value="BASKETBALL">Basketbol</option>
            <option value="VOLLEYBALL">Voleybol</option>
            <option value="TENNIS">Tenis</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Oyun Seviyesi</label>
          <select
            className="form-select"
            value={sportLevel}
            onChange={(e) => setSportLevel(e.target.value)}
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tarih</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Saat</label>
          <input
            type="time"
            className="form-control"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Maç Konumu - Saha</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gerekli Oyuncu Sayısı</label>
          <input
            type="number"
            className="form-control"
            value={playersNeeded}
            onChange={(e) => setPlayersNeeded(e.target.value)}
            onWheel={(e) => e.target.blur()}
            min="1" // Minimum value
            max="20" // Maximum value
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cinsiyet Tercihi</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="MALE">Erkek</option>
            <option value="FEMALE">Kız</option>
            <option value="ANY">Farketmez</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Telefon (ülke koduyla ) Örnek : +90553 123 4536
          </label>
          <input
            type="tel"
            className="form-control"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Açıklama</label>
          <textarea
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
