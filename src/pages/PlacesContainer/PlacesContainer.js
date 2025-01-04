import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import PlacesList from "../../components/features/PlacesList/PlacesList";
import { getPlaces } from "../../services/PlaceService";

const PlacesContainer = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const getPlacesFromBack = async () => {
      const response = await getPlaces();
      if (response.statusCode === 200) {
        setPlaces(response.data);
      }
    };
    getPlacesFromBack();
  });
  return (
    <div>
      <Navbar />
      <PlacesList places={places} />
    </div>
  );
};

export default PlacesContainer;
