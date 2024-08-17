import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import IyteCarSearchBar from "../../components/features/IyteCarSearchBar/IyteCarSearchBar";
import IyteCarRideList from "../../components/features/IyteCarRideList/IyteCarRideList";
import IyteCarCreateRide from "../../components/features/IyteCarCreateRide/IyteCarCreateRide";

const IyteCarContainer = () => {
  return (
    <div>
      <Navbar />
      <IyteCarSearchBar />
      <IyteCarRideList />
    </div>
  );
};

export default IyteCarContainer;
