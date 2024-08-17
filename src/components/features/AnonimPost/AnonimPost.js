import React, { useState } from "react";
import "../../../styles/AnonimPost/AnonimPost.css";
import anonimLogo from "../../../assets/anonimImages/anonim_logo.svg";

import complimentIconPhoto from "../../../assets/anonimImages/sikayet_et.svg";

import likePostIcon from "../../../assets/anonimImages/like_post_icon.svg";
import likePostIconActive from "../../../assets/anonimImages/heard_red.svg";

import commentPostIcon from "../../../assets/anonimImages/comment_post_icon.svg";
import { useNavigate } from "react-router";
import PostComplimentModal from "../../common/PostComplimentModal/PostComplimentModal";
import { Modal } from "react-bootstrap";

const AnonimPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(true);

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

  const handleLikeButton = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="container">
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
              <h6 className="card-title font-weight-bold mb-2">Anonim Post</h6>
              <p className="card-text fs-6">
                <i className="far fa-clock pe-1"></i>
                {post.date}
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
          {post.photos && (
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-4">
              {post.photos.map((image) => {
                return (
                  <img
                    src={image}
                    alt="post photo"
                    className="rounded img-fluid my-lg-0 my-2"
                    style={{ maxWidth: "280px", maxHeight: "200px" }}
                    onClick={() => handlePhotoShow(image)}
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
                  alt=""
                  className="img-fluid w-100 rounded"
                  centered
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

              <span className="ms-2">{post.numberOfLike}</span>
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
                <span className="ms-2">{post.numberOfComment}</span>
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
        </div>
      </section>
    </div>
  );
};

export default AnonimPost;
