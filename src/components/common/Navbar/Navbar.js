import React, { useEffect, useState } from "react";
import "../../../styles/Navbar/Navbar.css";
import { useLocation, useNavigate } from "react-router";
import iytechli_logo from "../../../assets/navbarImages/iytechli.svg";

const Navbar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    setCurrentPath(location.pathname);
  });
  const handleAnonim = () => {
    navigation("/anonims");
  };
  const handleIyteCar = () => {
    navigation("/iyte-car");
  };
  const handlePlace = () => {
    navigation("/places");
  };
  const handleSport = () => {
    navigation("/sports");
  };
  const handleLogin = () => {
    navigation("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-container">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src={iytechli_logo}
            alt="iytechli logo"
            className="navbar-logo"
          />
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
                className={`nav-link nav-item-size text-center ${
                  currentPath.startsWith("/anonims") ? "active" : ""
                }`}
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
                className={`nav-link nav-item-size text-center ${
                  currentPath.startsWith("/iyte-car") ? "active" : ""
                }`}
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
                className={`nav-link nav-item-size text-center ${
                  currentPath.startsWith("/places") ? "active" : ""
                }`}
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
                className={`nav-link nav-item-size text-center ${
                  currentPath.startsWith("/sports") ? "active" : ""
                }`}
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
            <li className="nav-item nav-link nav-item-size mx-lg-2 py-lg-2">
              <a
                className={`nav-link nav-item-size text-center text-primary ${
                  currentPath.startsWith("/login") ? "active" : ""
                }`}
                href="#"
                id="sport"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Giriş Yap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
