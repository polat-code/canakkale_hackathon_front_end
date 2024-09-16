import React from "react";

const MyMatchesCard = () => {
  return (
    <li>
      <div
        className="card shadow-sm match-card h-100"
        style={{ cursor: "pointer" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title text-uppercase">{"Futbol"}</h5>
            <span className="badge bg-primary">{"Intermediate"}</span>
          </div>
          <p className="card-text">
            <i className="bi bi-clock"></i> <strong>Tarih:</strong>{" "}
            {"11/07/2024"}
          </p>
          <p className="card-text">
            <i className="bi bi-clock"></i> <strong>Saat:</strong> {"15:00"}
          </p>
          <p className="card-text">
            <i className="bi bi-geo-alt"></i> <strong>Location:</strong>{" "}
            {"Saha"}
          </p>
          <p className="card-text">
            <i className="bi bi-people"></i> <strong>Players Needed:</strong>{" "}
            {"2"}
          </p>

          {/* 
                <button className="btn btn-outline-primary w-100 mt-3">
                  Join
                </button> */}
        </div>
      </div>
    </li>
  );
};

export default MyMatchesCard;
