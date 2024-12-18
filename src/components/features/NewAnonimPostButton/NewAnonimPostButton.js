import React from "react";
import "../../../styles/NewAnonimPostButton/NewAnonimPostButton.css";
import plusIcon from "../../../assets/anonimImages/plus_icon.svg";

const NewAnonimPostButton = ({ handleNewAnonymousPost }) => {
  return (
    <div className="d-flex justify-content-end w-100 mt-4 pe-lg-5 pe-2">
      <button className="btn btn-primary" onClick={handleNewAnonymousPost}>
        {" "}
        <img src={plusIcon} alt="" className="icon-green" /> Yeni Post
      </button>
    </div>
  );
};

export default NewAnonimPostButton;
