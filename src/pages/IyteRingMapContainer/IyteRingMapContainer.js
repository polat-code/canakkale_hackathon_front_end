import React, { useEffect, useState } from "react";
import IyteRingMap from "../../components/features/IyteRingMap/IyteRingMap";
import { getRingLocation } from "../../services/IyteRingLocationService";
import {
  toastError,
  toastSuccess,
} from "../../utils/toastNotification/toastNotifications";
import { ToastContainer } from "react-toastify";
import Navbar from "../../components/common/Navbar/Navbar";

const IyteRingMapContainer = () => {
  const [counter, setCounter] = useState(0.000002);
  const [position, setPosition] = useState([38.3149624, 26.636409]);

  useEffect(() => {
    const fetchRingLocation = async () => {
      const response = await getRingLocation();
      console.log(response);
      if (response && response.statusCode === 200) {
        setPosition([response.data.latitude, response.data.longitude]);
      } else {
        toastError("Bir hata oluştu!", 1500);
      }
    };

    const intervalId = setInterval(() => {
      fetchRingLocation();
    }, 10000);

    return () => clearInterval(intervalId); // Temizlik işlemi
  }, []); // Bağımlılık dizisi

  return (
    <div>
      <Navbar />

      <IyteRingMap position={position} />
    </div>
  );
};

export default IyteRingMapContainer;
