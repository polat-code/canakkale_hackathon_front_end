import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import NewPasswordEntry from "../../components/features/NewPasswordEntry/NewPasswordEntry";

const NewPasswordEntryContainer = () => {
  return (
    <div>
      <Navbar />
      <NewPasswordEntry />
    </div>
  );
};

export default NewPasswordEntryContainer;
