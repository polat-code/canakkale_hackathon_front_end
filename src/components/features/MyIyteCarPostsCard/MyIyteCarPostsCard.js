import React from "react";

const MyIyteCarPostsCard = () => {
  return (
    <li>
      <a href="" className="text-decoration-none">
        <div className="card mb-3 shadow-sm" key={1}>
          <div className="row g-0">
            <div className="col-md-8 p-3">
              <h5 className="card-title">
                <i className="bi bi-arrow-right-circle"></i>{" "}
                <span className="text-primary">{"Izmir"}</span> ➡{" "}
                <span className="text-success">{"İstanbul"}</span>
              </h5>
              <p className="card-text">
                <span className="fw-bold text-dark">Sürücü :</span>{" "}
                {"Ali Durmaz"}
              </p>
              <p className="card-text">
                <span className="fw-bold text-dark">Tarih : </span>{" "}
                {"12/03/2024"}
              </p>
              <p className="card-text">
                <span className="fw-bold text-dark">Saat : </span> {"12:00"}
              </p>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default MyIyteCarPostsCard;
