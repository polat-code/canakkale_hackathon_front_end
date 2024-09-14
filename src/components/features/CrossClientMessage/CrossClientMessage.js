import React from "react";
import clientImage from "../../../assets/messageImages/comment_photo.svg";

const CrossClientMessage = ({ fullname, time, message }) => {
  return (
    <>
      <li className="d-flex justify-content-between mb-4">
        <img
          src={clientImage}
          alt="avatar"
          className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
          width="60"
        />
        <div className="card">
          <div className="card-header d-flex justify-content-between p-3">
            <p className="fw-bold mb-0">{fullname}</p>
            <p className="text-muted small mb-0">
              <i className="far fa-clock"></i> {time}
            </p>
          </div>
          <div className="card-body">
            <p className="mb-0">{message}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default CrossClientMessage;
