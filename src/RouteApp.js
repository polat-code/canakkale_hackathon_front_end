import React from "react";
import { Route, Routes } from "react-router-dom";
import AnonimContainer from "./pages/AnonimContainer/AnonimContainer";
import IyteCarContainer from "./pages/IyteCarContainer/IyteCarContainer";
import PlacesContainer from "./pages/PlacesContainer/PlacesContainer";
import SportsContainer from "./pages/SportsContainer/SportsContainer";
import LoginContainer from "./pages/1ourPages/LoginContainer/LoginContainer";
import MyMessagesContainer from "./pages/MyMessagesContainer/MyMessagesContainer";
import ProfileContainer from "./pages/ProfileContainer/ProfileContainer";
import PostsAndAdvertsContainer from "./pages/PostsAndAdvertsContainer/PostsAndAdvertsContainer";
import AnonimPostDetailContainer from "./pages/AnonimPostDetailContainer/AnonimPostDetailContainer";
import RegisterContainer from "./pages/1ourPages/RegisterContainer/RegisterContainer";
import ForgotPasswordContainer from "./pages/ForgotPasswordContainer/ForgotPasswordContainer";
import OTPCodeEntryContainer from "./pages/OTPCodeEntryContainer/OTPCodeEntryContainer";
import NewPasswordEntryContainer from "./pages/NewPasswordEntryContainer/NewPasswordEntryContainer";
import IyteCarCreateRideContainer from "./pages/IyteCarCreateRideContainer/IyteCarCreateRideContainer";
import UserProfile from "./pages/1ourPages/UserProfil/UserProfil";
import AdminDashboard from "./pages/1ourPages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/1ourPages/UserDashboard/UserDashboard";
import IzinIstegiContainer from "./pages/1ourPages/IzinIste/IzinIste";
import TimeOffRequestList from "./pages/1ourPages/IzinTakip/TimeOffRequestList";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import PlaceDetailContainer from "./pages/PlaceDetailContainer/PlaceDetailContainer";
import ErrorContainer from "./pages/1ourPages/ErrorContainer/ErrorContainer";
import IyteRingMapContainer from "./pages/IyteRingMapContainer/IyteRingMapContainer";
import MainPageContainer from "./pages/1ourPages/MainPageContainer/MainPageContainer";
const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/main" element={<MainPageContainer />} />

      <Route path="*" element={<ErrorContainer />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/user/profil" element={<UserProfile />} />
      <Route path="/user/iziniste" element={<IzinIstegiContainer />} />
      <Route path="/user/izinlerim" element={<TimeOffRequestList />} />
      {/*
       <Route path="/anonims" element={<AnonimContainer />} />
      <Route path="/iyte-car" element={<IyteCarContainer />} />
      <Route path="/places" element={<PlacesContainer />} />
      <Route path="/places/detail" element={<PlaceDetailContainer />} />
      <Route path="/sports" element={<SportsContainer />} />
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
      <Route path="/anonims/detail" element={<AnonimPostDetailContainer />} />
      <Route
        path="/iyte-car/create-ride"
        element={<IyteCarCreateRideContainer />}
      />
      <Route path="/ring" element={<IyteRingMapContainer />} /> */}
    </Routes>
  );
};

export default RouteApp;
