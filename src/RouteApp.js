import React from "react";
import { Route, Routes } from "react-router-dom";
import AnonimContainer from "./pages/AnonimContainer/AnonimContainer";
import IyteCarContainer from "./pages/IyteCarContainer/IyteCarContainer";
import PlacesContainer from "./pages/PlacesContainer/PlacesContainer";
import SportsContainer from "./pages/SportsContainer/SportsContainer";
import LoginContainer from "./pages/LoginContainer/LoginContainer";
import MyMessagesContainer from "./pages/MyMessagesContainer/MyMessagesContainer";
import ProfileContainer from "./pages/ProfileContainer/ProfileContainer";
import PostsAndAdvertsContainer from "./pages/PostsAndAdvertsContainer/PostsAndAdvertsContainer";
const RouteApp = () => {
  return (
    <Routes>
      <Route path="/anonims" element={<AnonimContainer />} />
      <Route path="/iyte-car" element={<IyteCarContainer />} />
      <Route path="/places" element={<PlacesContainer />} />
      <Route path="/sports" element={<SportsContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/profile/my-messages" element={<MyMessagesContainer />} />
      <Route path="/profile" element={<ProfileContainer />} />
      <Route
        path="/profile/posts-and-advert"
        element={<PostsAndAdvertsContainer />}
      />
    </Routes>
  );
};

export default RouteApp;
