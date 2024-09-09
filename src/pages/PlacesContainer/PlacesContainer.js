import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import PlacesList from "../../components/features/PlacesList/PlacesList";

const PlacesContainer = () => {
  return (
    <div>
      <Navbar />
      <PlacesList />
    </div>
  );
};

export default PlacesContainer;
