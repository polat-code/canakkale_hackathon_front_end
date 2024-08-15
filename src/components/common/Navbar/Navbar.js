import React, { useEffect, useState } from "react";
import "../../../styles/Navbar/Navbar.css";
import { useLocation, useNavigate } from "react-router";
import iytechli_logo from "../../../assets/navbarImages/iytechli.svg";

const Navbar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const [isLogin, setIsLogin] = useState(true);

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
  const handleMyMessages = () => {
    navigation("/profile/my-messages");
  };
  const handleMyProfile = () => {
    navigation("/profile");
  };
  const handlePostsAndAdvert = () => {
    navigation("/profile/posts-and-advert");
  };
  const handleLogout = () => {
    setIsLogin(false);
    navigation("/");
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
        {/* Main Navigation Start */}
        <div
          className="collapse navbar-collapse justify-content-lg-end justify-content-center pe-lg-5"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {/* Main Navigation 1 Start */}
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
            {/* Main Navigation 1 END */}

            {/* Main Navigation 2 Start */}
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
            {/* Main Navigation 2 END */}

            {/* Main Navigation 3 Start */}
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
            {/* Main Navigation 3 END */}

            {/* Main Navigation 4 Start */}
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
            {/* Main Navigation 4 END */}

            {/* Main Navigation 5 Start */}
            {isLogin ? (
              ""
            ) : (
              <li className="nav-item nav-link nav-item-size mx-lg-2 py-lg-2">
                <a
                  className={`nav-link nav-item-size text-center text-primary ${
                    currentPath.startsWith("/login") ? "active" : ""
                  }`}
                  href="#"
                  id="login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  Giriş Yap
                </a>
              </li>
            )}

            {/* Main Navigation 5 END */}

            {/* Main Navigation 6 Start */}
            {isLogin ? (
              <div className="nav-item nav-link nav-item-size mx-lg-2 py-lg-2 dropdown">
                {/* Main Navigation 6 Main START */}
                <a
                  className={`nav-link nav-item-size text-center text-primary ${
                    currentPath.startsWith("/profile") ? "active" : ""
                  }`}
                  role="button"
                  id="profile"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  href="#"
                >
                  Profile
                </a>
                {/* Main Navigation 6 Main END */}

                <ul class="dropdown-menu" aria-labelledby="profile">
                  {/* Main Navigation 6 SubNavigation 1 START */}
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMyMessages();
                      }}
                    >
                      Mesajlarım
                    </a>
                  </li>
                  {/* Main Navigation 6 SubNavigation 1 END */}

                  {/* Main Navigation 6 SubNavigation 2 START */}
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMyProfile();
                      }}
                    >
                      Profilim
                    </a>
                  </li>
                  {/* Main Navigation 6 SubNavigation 2 END */}

                  {/* Main Navigation 6 SubNavigation 3 START */}
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePostsAndAdvert();
                      }}
                    >
                      Postlarım ve İlanlarım
                    </a>
                  </li>
                  {/* Main Navigation 6 SubNavigation 3 END */}

                  {/* Main Navigation 6 SubNavigation 4 START */}
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      Çıkış Yap
                    </a>
                  </li>
                  {/* Main Navigation 6 SubNavigation 4 END */}
                </ul>
              </div>
            ) : (
              ""
            )}
            {/* Main Navigation 6 END */}
          </ul>
        </div>
        {/* Main Navigation END */}
      </div>
    </nav>
  );
};

export default Navbar;
