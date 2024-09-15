import React from "react";
import clientImage from "../../../assets/messageImages/comment_photo.svg";

const MyAnonimPostsCard = () => {
  return (
    <div>
      <li
        className="p-2 border-bottom"
        //style={{ backgroundColor: "#eee" }}
      >
        <a
          href="#!"
          className="d-flex justify-content-between text-decoration-none"
        >
          <div className="d-flex flex-row">
            <img
              src={clientImage}
              alt="avatar"
              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
              width="60"
            />
            <div className="pt-1">
              <p className="fw-bold mb-0">Anonim Post</p>
              <p className="small text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </a>
      </li>
    </div>
  );
};

export default MyAnonimPostsCard;
