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
import NewAnonymousContainer from "./pages/NewAnonymousPostContainer/NewAnonymousContainer";
import AnonimPostDetailContainer from "./pages/AnonimPostDetailContainer/AnonimPostDetailContainer";
import RegisterContainer from "./pages/RegisterContainer/RegisterContainer";
import ForgotPasswordContainer from "./pages/ForgotPasswordContainer/ForgotPasswordContainer";
import OTPCodeEntryContainer from "./pages/OTPCodeEntryContainer/OTPCodeEntryContainer";
import NewPasswordEntryContainer from "./pages/NewPasswordEntryContainer/NewPasswordEntryContainer";
import IyteCarCreateRideContainer from "./pages/IyteCarCreateRideContainer/IyteCarCreateRideContainer";
const RouteApp = () => {
  return (
    <Routes>
      <Route path="/anonims" element={<AnonimContainer />} />
      <Route path="/iyte-car" element={<IyteCarContainer />} />
      <Route path="/places" element={<PlacesContainer />} />
      <Route path="/sports" element={<SportsContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/forgot-password" element={<ForgotPasswordContainer />} />
      <Route path="/forgot-password/otp" element={<OTPCodeEntryContainer />} />
      <Route
        path="/forgot-password/new-password"
        element={<NewPasswordEntryContainer />}
      />

      <Route path="/profile/my-messages" element={<MyMessagesContainer />} />
      <Route path="/profile" element={<ProfileContainer />} />
      <Route
        path="/profile/posts-and-advert"
        element={<PostsAndAdvertsContainer />}
      />
      <Route
        path="/anonims/new-anonymous-post"
        element={<NewAnonymousContainer />}
      />
      <Route path="/anonims/detail" element={<AnonimPostDetailContainer />} />
      <Route
        path="/iyte-car/create-ride"
        element={<IyteCarCreateRideContainer />}
      />
    </Routes>
  );
};

export default RouteApp;
