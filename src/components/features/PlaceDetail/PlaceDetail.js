import React from "react";

const PlaceDetail = ({ restaurant }) => {
  return (
    <div className="mt-5">
      <h2>{restaurant.name} - Details</h2>
      <p>
        <strong>Open Hours:</strong> {restaurant.openStarted} -{" "}
        {restaurant.openStop}
      </p>
      <p>
        <strong>Phone Number:</strong> {restaurant.telephoneNumber}
      </p>

      <h3>Comments</h3>
      {restaurant.placeComments && restaurant.placeComments.length > 0 ? (
        <ul className="list-group">
          {restaurant.placeComments.map((comment, index) => (
            <li key={index} className="list-group-item">
              {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available yet.</p>
      )}

      <h3>Compliments</h3>
      {restaurant.placeCompliments && restaurant.placeCompliments.length > 0 ? (
        <ul className="list-group">
          {restaurant.placeCompliments.map((compliment, index) => (
            <li key={index} className="list-group-item">
              {compliment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No compliments available yet.</p>
      )}
    </div>
  );
};

export default PlaceDetail;
