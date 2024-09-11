import React from "react";
import PlaceCommentComplimentModal from "../PlaceCommentComplimentModal/PlaceCommentComplimentModal";
import PlaceComment from "../PlaceComment/PlaceComment";
import { useNavigate } from "react-router";
import plusIcon from "../../../assets/anonimImages/plus_icon.svg";

const PlaceDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <h2>Restaurant 1 - Details</h2>
      <div className="container mt-3 match-list-container">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-success"
            //onClick={() => navigate("/iyte-car/create-ride")}
          >
            <img src={plusIcon} alt="" className="icon-green" />
            Yeni Yorum Yap
          </button>
        </div>
      </div>
      <p>
        <strong>Open Hours:</strong> 12:00 - 23:00
      </p>
      <p>
        <strong>Phone Number:</strong> +905531521391
      </p>

      <h3>Comments</h3>

      <div className="container">
        <PlaceComment />
        <PlaceComment />
        <PlaceComment />
      </div>

      <PlaceCommentComplimentModal />
      {/* restaurant.placeComments && restaurant.placeComments.length > 0 ? (
        <ul className="list-group">
          {restaurant.placeComments.map((comment, index) => (
            <li key={index} className="list-group-item">
              {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available yet.</p>
      ) */}
    </div>
  );
};

export default PlaceDetail;
