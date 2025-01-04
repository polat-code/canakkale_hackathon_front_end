import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import PlaceDetail from "../../components/features/PlaceDetail/PlaceDetail";
import { useSearchParams } from "react-router-dom";
import LoadingAnimation from "../../components/common/LoadingAnimation/LoadingAnimation";

const PlaceDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const placeId = searchParams.get("placeId");
    if (!placeId) {
    }
  });
  return (
    <div>
      <Navbar />
      {isLoading ? <LoadingAnimation /> : <PlaceDetail />}
    </div>
  );
};

export default PlaceDetailContainer;
