import React, { useState } from "react";
import userIconPhoto from "../../../assets/anonimImages/user_icon.svg";
import commentLikeIconPhoto from "../../../assets/anonimImages/comment_like_icon.svg";
import commentLikeIconPhotoActive from "../../../assets/anonimImages/comment_like_icon_active.svg";

import commentDislikeIconPhoto from "../../../assets/anonimImages/comment_dislike_icon.svg";
import commentDislikeIconPhotoActive from "../../../assets/anonimImages/comment_dislike_icon_active.svg";

import complimentIconPhoto from "../../../assets/anonimImages/sikayet_et.svg";
import "../../../styles/AnonimPostDetail/AnonimPostDetail.css";
import CommentComplimentModal from "../../common/CommentComplimentModal/CommentComplimentModal";
import {
  dislikePostComment,
  likePostComment,
} from "../../../services/PostCommentAPIService";
import { toastError } from "../../../utils/toastNotification/toastNotifications";
import { ToastContainer } from "react-toastify";

const AnonimPostComment = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(comment.isUserLikes);
  const [isDisliked, setIsDisliked] = useState(comment.isUserDislikes);
  const [numOfLikes, setNumOfLikes] = useState(comment.numberOfLikes);
  const [numOfDislikes, setNumOfDislikes] = useState(comment.numberOfDislikes);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCommentDislikeIcon = async () => {
    const dislikeResponse = await dislikePostComment(comment.commentId);
    if (dislikeResponse.statusCode === 200) {
      setIsDisliked(!isDisliked);
      if (isDisliked) {
        setNumOfDislikes(numOfDislikes - 1);
      } else {
        setNumOfDislikes(numOfDislikes + 1);
      }
      if (isLiked) {
        setIsLiked(!isLiked);
        setNumOfLikes(numOfLikes - 1);
      }
    } else {
      toastError("Bir problem ile karşılaşıldı!");
    }
  };
  const handleCommentLikeIcon = async () => {
    const likeResponse = await likePostComment(comment.commentId);
    if (likeResponse.statusCode === 200) {
      setIsLiked(!isLiked);
      if (isLiked) {
        setNumOfLikes(numOfLikes - 1);
      } else {
        setNumOfLikes(numOfLikes + 1);
      }

      if (isDisliked) {
        setIsDisliked(!isDisliked);
        setNumOfDislikes(numOfDislikes - 1);
      }
    } else {
      toastError("Bir problem ile karşılaşıldı!");
    }
  };

  return (
    <div>
      <div className="border-bottom border-top rounded">
        <div className="d-flex ms-3">
          <img src={userIconPhoto} alt="" />
          <div className="ms-3 my-2">
            <span className="time-definition">{comment.date}</span>
            <h6 className="fw-bold message-font-size">
              {comment.userFullName}
            </h6>
          </div>
        </div>

        <p className="mx-3">{comment.commentContent}</p>

        <div className="d-flex flex-row justify-content-around mb-3">
          <div
            className="d-flex justify-content-center custom-cursor"
            onClick={handleCommentLikeIcon}
          >
            {isLiked ? (
              <img src={commentLikeIconPhotoActive} alt="like_active" />
            ) : (
              <img src={commentLikeIconPhoto} alt="like_passive" />
            )}

            <span className="ms-2">{numOfLikes}</span>
          </div>

          <div
            className="d-flex justify-content-center custom-cursor"
            onClick={handleCommentDislikeIcon}
          >
            <img
              src={
                isDisliked
                  ? commentDislikeIconPhotoActive
                  : commentDislikeIconPhoto
              }
              alt=""
              className="like-icon"
            />
            <span className="ms-2">{numOfDislikes}</span>
          </div>

          <div className="compliment-link" onClick={handleOpenModal}>
            <div className="d-flex justify-content-center">
              <img src={complimentIconPhoto} alt="" />
              <span className="ms-2">Şikayet Et</span>
            </div>
          </div>
        </div>
      </div>
      {/* Comment Compliment Modal START */}
      <CommentComplimentModal
        commentId={comment && comment.commentId}
        show={showModal}
        handleClose={handleCloseModal}
      />
      {/* Comment Compliment Modal END */}
    </div>
  );
};

export default AnonimPostComment;
