import React, { useState } from "react";
import "../../../styles/AnonimPost/AnonimPost.css";
import anonimLogo from "../../../assets/anonimImages/anonim_logo.svg";

import complimentIconPhoto from "../../../assets/anonimImages/sikayet_et.svg";
import likeIcon from "../../../assets/anonimImages/like_post_icon.svg";
import commentPostIcon from "../../../assets/anonimImages/comment_post_icon.svg";

const AnonimPost = ({ content, date }) => {
  const [isLiked, setIsLiked] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [numberOfLike, setNumberOfLike] = useState(10);
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
                <i className="far fa-clock pe-1"></i>07/24/2018
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
            <p className="card-text">
              Recently, we added several exotic new dishes to our restaurant
              menu. They come from countries such as Mexico, Argentina, and
              Spain. Come to us, have some wine and enjoy our juicy meals from
              around the world.Recently, we added several exotic new dishes to
              our restaurant menu. They come from countries such as Mexico,
              Argentina, and Spain. Come to us, have some wine and enjoy our
              juicy meals from around the world.Recently, we added several
              exotic new dishes to our restaurant menu. They come from countries
              such as Mexico, Argentina, and Spain. Come to us, have some wine
              and enjoy our juicy meals from around the world.Recently, we added
              several exotic new dishes to our restaurant menu. They come from
              countries such as Mexico, Argentina, and Spain. Come to us, have
              some wine and enjoy our juicy meals from around the world.
            </p>
          </div>
          {/* Interactions */}
          <div className="d-flex flex-row justify-content-around mb-3">
            {/* Like */}

            <div
              className="d-flex justify-content-center cursor-pointer"
              //onClick={handleLikeButton}
            >
              <img src={likeIcon} alt="like-icon" className="like-icon" />

              <span className="ms-2">10</span>
            </div>

            {/* Like END */}

            {/* Comment */}
            <div
              href=""
              className="compliment-link cursor-pointer"
              //onClick={handlePostDetail}
            >
              <div className="d-flex justify-content-center">
                <img src={commentPostIcon} alt="" />
                <span className="ms-2">10</span>
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
            {/* <PostComplimentModal userId={user.userId} postId={postId} /> */}
            {/* Compliment Module END*/}
          </div>
          {/* Interactions END */}
        </div>
      </section>
    </div>
  );
};

export default AnonimPost;
