import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPost from "../../components/features/AnonimPost/AnonimPost";

const AnonimContainer = () => {
  return (
    <div>
      <Navbar />
      <AnonimPost />
      <AnonimPost />
      <AnonimPost />
      <AnonimPost />
    </div>
  );
};

export default AnonimContainer;
