import React, { useState } from "react";
import "../../../styles/MatchList/MatchList.css";

import MatchSearch from "../MatchSearch/MatchSearch";
import plusIcon from "../../../assets/anonimImages/plus_icon.svg";
import { useNavigate } from "react-router";

const MatchList = () => {
  const navigation = useNavigate();

  const handleNewMatch = () => {
    navigation("/sports/new-match");
  };
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: "Özgürhan Polat",
      sport: "Football",
      time: "14:00",
      date: "12-09-2024",
      location: "Field A",
      playersNeeded: 2,
      level: "Intermediate",
      gender: "Any",
      telephone: "+905531521381",
      description:
        "Looking for players with decent skills for a friendly match.",
    },
    {
      id: 2,
      name: "Özgürhan Polat",
      sport: "Basketball",
      time: "16:00",
      date: "15-09-2024",
      location: "Court 1",
      playersNeeded: 1,
      level: "Advanced",
      gender: "Male",
      telephone: "+905531521381",
      description: "Competitive game, need one more player.",
    },
    {
      id: 4,
      name: "Özgürhan Polat",
      sport: "Volleyball",
      time: "18:00",
      date: "12-12-2024",
      location: "Court 2",
      playersNeeded: 3,
      level: "Beginner",
      gender: "Female",
      telephone: "+905531521381",
      description: "Casual game for beginners.",
    },
    {
      id: 5,
      name: "Özgürhan Polat",
      sport: "Volleyball",
      time: "18:00",
      date: "12-09-2024",
      location: "Court 2",
      playersNeeded: 3,
      level: "Beginner",
      gender: "Female",
      telephone: "+905531521381",
      description: "Casual game for beginners.",
    },
    {
      id: 6,
      name: "Özgürhan Polat",
      sport: "Volleyball",
      time: "18:00",
      date: "12-09-2024",
      location: "Court 2",
      playersNeeded: 3,
      level: "Beginner",
      gender: "Female",
      telephone: "+905531521381",
      description: "Casual game for beginners.",
    },
  ]);

  return (
    <div className="container mt-5 match-list-container">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={handleNewMatch}>
          <img src={plusIcon} alt="" className="icon-green" />
          Create A Match
        </button>
      </div>

      <h2 className="text-center mb-4">Find a Match</h2>

      <MatchSearch matches={matches} setMatches={setMatches} />
      <div className="row">
        {matches.map((match) => (
          <div key={match.id} className="col-md-4 mb-4">
            <div className="card shadow-sm match-card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title text-uppercase">{match.sport}</h5>
                  <span className="badge bg-primary">{match.level}</span>
                </div>
                <p className="card-text">
                  <i className="bi bi-clock"></i> <strong>İlan Sahibi :</strong>{" "}
                  {match.name}
                </p>
                <p className="card-text">
                  <i className="bi bi-clock"></i> <strong>Tarih:</strong>{" "}
                  {match.date}
                </p>
                <p className="card-text">
                  <i className="bi bi-clock"></i> <strong>Saat:</strong>{" "}
                  {match.time}
                </p>
                <p className="card-text">
                  <i className="bi bi-geo-alt"></i> <strong>Location:</strong>{" "}
                  {match.location}
                </p>
                <p className="card-text">
                  <i className="bi bi-people"></i>{" "}
                  <strong>Players Needed:</strong> {match.playersNeeded}
                </p>
                <p className="card-text">
                  <i className="bi bi-gender-ambiguous"></i>{" "}
                  <strong>Gender Preference:</strong> {match.gender}
                </p>
                <p className="card-text">
                  <i className="bi bi-chat-dots"></i> <strong>Telefon:</strong>{" "}
                  {match.telephone}
                </p>
                <p className="card-text">
                  <i className="bi bi-chat-dots"></i>{" "}
                  <strong>Description:</strong> {match.description}
                </p>
                {/* 
                <button className="btn btn-outline-primary w-100 mt-3">
                  Join
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
