import React from "react";
import userIconPhoto from "../../../assets/anonimImages/user_icon.svg";
import commentLikeIconPhoto from "../../../assets/anonimImages/comment_like_icon.svg";
import commentDislikeIconPhoto from "../../../assets/anonimImages/comment_dislike_icon.svg";
import complimentIconPhoto from "../../../assets/anonimImages/sikayet_et.svg";
import "../../../styles/AnonimPostDetail/AnonimPostDetail.css";

const AnonimComment = () => {
  return (
    <div>
      <div className="border-bottom border-top rounded">
        <div className="d-flex ms-3">
          <img src={userIconPhoto} alt="" />
          <div className="ms-3 my-2">
            <span className="time-definition">12sn önce</span>
            <h6 className="fw-bold message-font-size">Özgürhan Polat</h6>
          </div>
        </div>

        <p className="mx-3">
          This is a comment This is a comment This is a comment This is a
          comment This is a comment This is a comment This is a comment This is
          a comment This is a comment This is a comment This is a comment This
          is a comment This is a comment
        </p>

        <div className="d-flex flex-row justify-content-around mb-3">
          <div
            className="d-flex justify-content-center custom-cursor"
            //onClick={handleCommentLikeIcon}
          >
            <img src={commentLikeIconPhoto} alt="" />
            <span className="ms-2">20</span>
          </div>

          <div
            className="d-flex justify-content-center custom-cursor"
            //onClick={handleCommentDislikeIcon}
          >
            <img src={commentDislikeIconPhoto} alt="" className="like-icon" />
            <span className="ms-2">10</span>
          </div>

          <div
            className="compliment-link"
            data-bs-toggle="modal"
            data-bs-target="#comment_compliment_modal"
          >
            <div className="d-flex justify-content-center">
              <img src={complimentIconPhoto} alt="" />
              <span className="ms-2">Şikayet Et</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonimComment;
