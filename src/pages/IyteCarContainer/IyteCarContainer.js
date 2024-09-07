import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import IyteCarSearchBar from "../../components/features/IyteCarSearchBar/IyteCarSearchBar";
import IyteCarRideList from "../../components/features/IyteCarRideList/IyteCarRideList";
import IyteCarCreateRide from "../../components/features/IyteCarCreateRide/IyteCarCreateRide";
import plusIcon from "../../assets/anonimImages/plus_icon.svg";
import { useNavigate } from "react-router";

const IyteCarContainer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="container mt-3 match-list-container">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success"
            onClick={() => navigate("/iyte-car/create-ride")}
          >
            <img src={plusIcon} alt="" className="icon-green" />
            Seyahat İlanı Ver
          </button>
        </div>
      </div>

      <IyteCarSearchBar />
      <IyteCarRideList />
    </div>
  );
};

export default IyteCarContainer;
