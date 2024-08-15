import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPost from "../../components/features/AnonimPost/AnonimPost";
import NewAnonimPostButton from "../../components/features/NewAnonimPostButton/NewAnonimPostButton";

const AnonimContainer = () => {
  return (
    <div>
      <Navbar />
      <NewAnonimPostButton />
      <AnonimPost />
      <AnonimPost />
      <AnonimPost />
      <AnonimPost />
    </div>
  );
};

export default AnonimContainer;
