import React, { useState } from "react";
import "../../../styles/AnonimPost/AnonimPost.css";
import anonimLogo from "../../../assets/anonimImages/anonim_logo.svg";

import complimentIconPhoto from "../../../assets/anonimImages/sikayet_et.svg";

import likePostIcon from "../../../assets/anonimImages/like_post_icon.svg";
import likePostIconActive from "../../../assets/anonimImages/heard_red.svg";

import commentPostIcon from "../../../assets/anonimImages/comment_post_icon.svg";
import { useNavigate } from "react-router";
import PostComplimentModal from "../../common/PostComplimentModal/PostComplimentModal";
import { Button, Modal } from "react-bootstrap";
import { likePostAPI } from "../../../services/PostFetchService";
import { ToastContainer } from "react-toastify";
import { toastError } from "../../../utils/toastNotification/toastNotifications";

const AnonimPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isCurrentUserLikePost);
  const [numOfLikes, setNumOfLikes] = useState(post.numberOfLikes);
  const [showCompModal, setShowCompModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const [showPhoto, setShowPhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handlePhotoShow = (image) => {
    setSelectedImage(image);
    setShowPhoto(true);
  };
  const navigation = useNavigate();

  const handleAnonimPostDetail = () => {
    navigation("/anonims/detail?postId=" + post.postId);
  };

  const handleLikeButton = async () => {
    const likeResponse = await likePostAPI(post.postId);
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
                {post.postOwnerFullName}
              </h6>
              <p className="card-text fs-6">
                <i className="far fa-clock pe-1"></i>
                {post.createdAt}
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
              className="card-text cursor-pointer"
              //onClick={handleAnonimPostDetail}
            >
              {post.content}
            </p>
          </div>
          {/* Images START */}
          {post.photoList && (
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-4">
              {post.photoList.map((image) => {
                return (
                  <img
                    src={image.data}
                    alt="post photo"
                    className="rounded img-fluid my-lg-0 my-2"
                    style={{ maxWidth: "280px", maxHeight: "200px" }}
                    onClick={() => handlePhotoShow(image.data)}
                  />
                );
              })}
            </div>
          )}
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
                  alt="Fotoğraf"
                  className="img-fluid w-100 rounded"
                />
              </div>
            </Modal.Body>
          </Modal>

          {/* Photo Modal END */}

          {/* Interactions */}
          <div className="d-flex flex-row justify-content-around mb-3">
            {/* Like */}

            <div
              className="d-flex justify-content-center cursor-pointer"
              onClick={handleLikeButton}
            >
              <img
                src={isLiked ? likePostIconActive : likePostIcon}
                alt="like-icon"
                className="like-icon"
              />

              <span className="ms-2">{numOfLikes}</span>
            </div>

            {/* Like END */}

            {/* Comment */}
            <div
              href=""
              className="compliment-link cursor-pointer"
              onClick={handleAnonimPostDetail}
            >
              <div className="d-flex justify-content-center">
                <img src={commentPostIcon} alt="" />
                <span className="ms-2">{post.numberOfComments}</span>
              </div>
            </div>
            {/* Comment END */}

            {/* Compliment */}
            <span
              variant="link"
              className="compliment-link cursor-pointer"
              onClick={handleOpenModal}
            >
              <div className="d-flex justify-content-center">
                <img src={complimentIconPhoto} alt="Compliment Icon" />
                <span className="ms-2">Şikayet Et</span>
              </div>
            </span>
            {/* Compliment END */}

            {/* Compliment Module*/}
            <PostComplimentModal
              postId={post.postId}
              show={showModal}
              handleClose={handleCloseModal}
            />
            {/* Compliment Module END*/}
          </div>
          {/* Interactions END */}
        </div>
      </section>
    </div>
  );
};

export default AnonimPost;
