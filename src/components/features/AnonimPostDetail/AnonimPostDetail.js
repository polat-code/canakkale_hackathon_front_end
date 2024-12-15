import React, { useState } from "react";
import image from "../../../assets/anonimImages/post_photo.svg";

import complimentIconPhoto from "../../../assets/anonimImages/sikayet_et.svg";
import likePostIcon from "../../../assets/anonimImages/like_post_icon.svg";
import likePostIconActive from "../../../assets/anonimImages/heard_red.svg";

import commentPostIcon from "../../../assets/anonimImages/comment_post_icon.svg";
import anonimLogo from "../../../assets/anonimImages/anonim_logo.svg";
import AnonimPostComment from "../AnonimPostComment/AnonimPostComment";
import CommentInput from "../CommentInput/CommentInput";
import PostComplimentModal from "../../common/PostComplimentModal/PostComplimentModal";
import LikeCountModal from "../LikeCountModal/LikeCountModal";
import { Modal, ToastContainer } from "react-bootstrap";
import { likePostAPI } from "../../../services/PostFetchService";
import { toastError } from "../../../utils/toastNotification/toastNotifications";

const AnonimPostDetail = ({ post, setPost }) => {
  const [isLiked, setIsLiked] = useState(
    post.postResponse.isCurrentUserLikePost
  );
  const [numOfLikes, setNumOfLikes] = useState(post.postResponse.numberOfLikes);
  const [numOfComment, setNumOfComment] = useState(
    post.postResponse.numberOfComments
  );
  const [showPhoto, setShowPhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handlePhotoShow = (image) => {
    setSelectedImage(image);
    setShowPhoto(true);
  };

  const handleLikeButton = async () => {
    const likeResponse = await likePostAPI(post.postResponse.postId);

    if (likeResponse.statusCode === 200) {
      if (isLiked) {
        setNumOfLikes(numOfLikes - 1);
      } else {
        setNumOfLikes(numOfLikes + 1);
      }
      setIsLiked(!isLiked);
    } else {
      console.log(JSON.stringify(likeResponse));
      toastError("Bilinmeyen bir hata !");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <section className="mx-auto my-5 w-lg-75 w-100">
        <div className="card">
          <div className="card-body d-flex flex-row">
            <img
              src={anonimLogo}
              className="rounded-circle me-3"
              height="50px"
              width="50px"
              alt="avatar"
            />
            <div>
              <h6 className="card-title font-weight-bold mb-2">
                {post.postResponse.postOwnerFullName}
              </h6>
              <p className="card-text fs-6">
                <span className="far fa-clock pe-1">
                  {post.postResponse.createdAt}
                </span>
              </p>
            </div>
          </div>
          <div
            className="bg-image hover-overlay ripple rounded-0"
            data-mdb-ripple-color="light"
          >
            <a href="#!">
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </a>
          </div>
          <div className="card-body">
            <p
              className="card-text"
              //onClick={handleAnonimPostDetail}
            >
              {post.postResponse.content}
            </p>
          </div>
          {/* Images START */}

          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-4">
            {post.postResponse.photoList.map((photo, index) => (
              <img
                src={photo.data}
                alt="post photo"
                className="rounded img-fluid my-lg-0 my-2"
                style={{ maxWidth: "280px", maxHeight: "200px" }}
                onClick={() => handlePhotoShow(photo.data)}
                key={index}
              />
            ))}
          </div>

          {/* Images END */}
          {/* Photo Modal */}
          <Modal show={showPhoto} onHide={() => setShowPhoto(false)} centered>
            <Modal.Header closeButton className="no-border-header">
              <span className="text-danger fw-bold">Fotoğraf Detayı</span>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-center">
                <img
                  src={selectedImage}
                  alt=""
                  className="img-fluid w-100 rounded"
                  centered
                />
              </div>
            </Modal.Body>
          </Modal>

          {/* Photo Modal END */}

          {/* Like count */}
          <a
            href=""
            className="like-button"
            data-bs-toggle="modal"
            data-bs-target="#users_like"
          >
            <p className="fs-6 m-4">
              <span className="fw-bold">{numOfLikes} </span>
              kişi postu beğendi
            </p>
          </a>
          {/* Like count End */}

          {/* Interactions */}
          <div className="d-flex flex-row justify-content-around mb-3">
            {/* Like */}

            <div
              className="d-flex justify-content-center cursor-pointer"
              onClick={handleLikeButton}
            >
              <img alt="" src={isLiked ? likePostIconActive : likePostIcon} />

              <span className="ms-2">{numOfLikes}</span>
            </div>

            {/* Like END */}

            {/* Comment */}
            <div
              href=""
              className="compliment-link cursor-pointer"
              //onClick={handleAnonimPostDetail}
            >
              <div className="d-flex justify-content-center">
                <img src={commentPostIcon} alt="" />
                <span className="ms-2">{numOfComment}</span>
              </div>
            </div>
            {/* Comment END */}

            {/* Compliment */}
            <a
              href=""
              className="compliment-link"
              data-bs-toggle="modal"
              data-bs-target="#post_compliment_modal"
            >
              <div className="d-flex justify-content-center">
                <img src={complimentIconPhoto} alt="" />
                <span className="ms-2">Şikayet Et</span>
              </div>
            </a>
            {/* Compliment END */}

            {/* Compliment Module*/}
            <PostComplimentModal />
            {/* Compliment Module END*/}
          </div>
          {/* Interactions END */}

          <CommentInput post={post} setPost={setPost} />
          {/* Like Count Module START*/}
          <LikeCountModal />
          {/* Like Count Module END*/}
          {post.commentResponses.map((comment, index) => {
            return <AnonimPostComment key={index} comment={comment} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default AnonimPostDetail;
