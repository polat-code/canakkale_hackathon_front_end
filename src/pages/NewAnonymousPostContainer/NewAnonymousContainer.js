import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import NewAnonimPostForm from "../../components/features/NewAnonimPostForm/NewAnonimPostForm";

const NewAnonymousContainer = () => {
  return (
    <div>
      <Navbar />
      <NewAnonimPostForm />
    </div>
  );
};

export default NewAnonymousContainer;
