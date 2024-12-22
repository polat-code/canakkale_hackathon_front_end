import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import React from "react";
import { Icon } from "leaflet";
import { ToastContainer } from "react-toastify";

const IyteRingMap = ({ position }) => {
  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../../assets/iyteRingImages/placeholder.png"),
    iconSize: [38, 38], // size of the icon
  });

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100"
      style={{ height: "80vh", width: "80%" }}
    >
      <ToastContainer />
      <h2>Canlı Ring</h2>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "95%", width: "95%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default IyteRingMap;
