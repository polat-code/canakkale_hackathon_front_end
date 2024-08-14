import React from "react";
import { Route, Routes } from "react-router-dom";
import AnonimContainer from "./pages/AnonimContainer/AnonimContainer";
import IyteCarContainer from "./pages/IyteCarContainer/IyteCarContainer";
import PlacesContainer from "./pages/PlacesContainer/PlacesContainer";
import SportsContainer from "./pages/SportsContainer/SportsContainer";
const RouteApp = () => {
  return (
    <Routes>
      <Route path="/anonims" element={<AnonimContainer />} />
      <Route path="/iyte-car" element={<IyteCarContainer />} />
      <Route path="/places" element={<PlacesContainer />} />
      <Route path="/sports" element={<SportsContainer />} />
    </Routes>
  );
};

export default RouteApp;
