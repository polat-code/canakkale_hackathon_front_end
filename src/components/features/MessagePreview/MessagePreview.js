import React from "react";
import clientImage from "../../../assets/messageImages/comment_photo.svg";

const MessagePreview = ({ fullname, lastMessage, numberOfIsNotRead, time }) => {
  return (
    <div>
      <li
        className="p-2 border-bottom"
        //style={{ backgroundColor: "#eee" }}
      >
        <a href="#!" className="d-flex justify-content-between">
          <div className="d-flex flex-row">
            <img
              src={clientImage}
              alt="avatar"
              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
              width="60"
            />
            <div className="pt-1">
              <p className="fw-bold mb-0">{fullname}</p>
              <p className="small text-muted">{lastMessage}</p>
            </div>
          </div>
          <div className="pt-1">
            <p className="small text-muted mb-1">{time}</p>
            <span className="badge bg-danger float-end">
              {numberOfIsNotRead}
            </span>
          </div>
        </a>
      </li>
    </div>
  );
};

export default MessagePreview;
