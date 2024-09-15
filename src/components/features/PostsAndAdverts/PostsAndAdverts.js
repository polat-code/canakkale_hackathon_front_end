import React from "react";
import MyAnonimPosts from "../MyAnonimPosts/MyAnonimPosts";

const PostsAndAdverts = () => {
  return (
    <div
      className="container-fluid pt-3 mb-0"
      style={{ backgroundColor: "#eee", height: "100%" }}
    >
      <div className="row">
        <MyAnonimPosts />
      </div>
    </div>
  );
};

export default PostsAndAdverts;
