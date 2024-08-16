import React from "react";
import commentModalIconPhoto from "../../../assets/anonimImages/comment_modal_icon.svg";
import userIconPhoto from "../../../assets/anonimImages/user_icon.svg";
import "../../../styles/LikeCountModalUser/LikeCountModalUser.css";

const LikeCountModalUser = ({ fullName }) => {
  return (
    <div className="user-like-container">
      <a href="" className="modal-link">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img src={userIconPhoto} alt="" />
            <h6 className="ms-2 pt-2 fw-bold">{fullName}</h6>
          </div>
          <img className="" src={commentModalIconPhoto} alt="" />
        </div>
      </a>
    </div>
  );
};

export default LikeCountModalUser;
