import React, { useEffect } from "react";
import "../../../styles/Navbar/Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const anonimElement = document.querySelector("#anonim");
    anonimElement.classList.add("active");
  });
  const disabledOtherNavs = () => {
    const anonimElement = document.querySelector("#anonim");
    anonimElement.classList.remove("active");
    const iyteCarElement = document.querySelector("#iyte_car");
    iyteCarElement.classList.remove("active");
    const placeElement = document.querySelector("#place");
    placeElement.classList.remove("active");
    const sportElement = document.querySelector("#sport");
    sportElement.classList.remove("active");
  };
  const handleAnonim = () => {
    disabledOtherNavs();
    const anonimElement = document.querySelector("#anonim");
    anonimElement.classList.add("active");
  };
  const handleIyteCar = () => {
    disabledOtherNavs();
    const iyteCarElement = document.querySelector("#iyte_car");
    iyteCarElement.classList.add("active");
  };
  const handlePlace = () => {
    disabledOtherNavs();
    const placeElement = document.querySelector("#place");
    placeElement.classList.add("active");
  };
  const handleSport = () => {
    disabledOtherNavs();
    const sportElement = document.querySelector("#sport");
    sportElement.classList.remove("active");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-lg-end justify-content-center pe-lg-5"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item mx-lg-2 py-lg-2">
              <a
                className="nav-link nav-item-size"
                aria-current="page"
                href="#"
                id="anonim"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnonim();
                }}
              >
                Anonim
              </a>
            </li>
            <li className="nav-item mx-lg-2 py-lg-2">
              <a
                className="nav-link nav-item-size"
                href="#"
                id="iyte_car"
                onClick={(e) => {
                  e.preventDefault();
                  handleIyteCar();
                }}
              >
                İyte Car
              </a>
            </li>
            <li className="nav-item mx-lg-2 py-lg-2">
              <a
                className="nav-link nav-item-size"
                href="#"
                id="place"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlace();
                }}
              >
                Mekan
              </a>
            </li>
            <li className="nav-item mx-lg-2 py-lg-2">
              <a
                className="nav-link nav-item-size"
                href="#"
                id="sport"
                onClick={(e) => {
                  e.preventDefault();
                  handleSport();
                }}
              >
                Spor
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
