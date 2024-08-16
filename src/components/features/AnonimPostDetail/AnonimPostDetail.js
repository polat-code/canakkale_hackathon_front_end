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

const AnonimPostDetail = () => {
  const [isLiked, setIsLiked] = useState(true);

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
                2024-08-10T14:35:00Z
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
              {
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              }
            </p>
          </div>
          {/* Images START */}

          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-around mb-4">
            <img
              src={image}
              alt="post photo"
              className="rounded img-fluid my-lg-0 my-2"
              style={{ maxWidth: "280px", maxHeight: "200px" }}
              //onClick={() => handlePhotoShow(image.image)}
            />
            <img
              src={image}
              alt="post photo"
              className="rounded img-fluid my-lg-0 my-2"
              style={{ maxWidth: "280px", maxHeight: "200px" }}
              //onClick={() => handlePhotoShow(image.image)}
            />
          </div>

          {/* Images END */}

          {/* Like count */}
          <a
            href=""
            className="like-button"
            data-bs-toggle="modal"
            data-bs-target="#users_like"
          >
            <p className="fs-6 m-4">
              <span className="fw-bold">12 </span>
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

              <span className="ms-2">11</span>
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
                <span className="ms-2">6</span>
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

          <CommentInput />
          {/* Like Count Module START*/}
          <LikeCountModal />
          {/* Like Count Module END*/}

          <AnonimPostComment />
          <AnonimPostComment />
          <AnonimPostComment />
        </div>
      </section>
    </div>
  );
};

export default AnonimPostDetail;
