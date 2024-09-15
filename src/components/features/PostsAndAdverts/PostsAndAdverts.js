import React from "react";
import MyAnonimPosts from "../MyAnonimPosts/MyAnonimPosts";
import MyIyteCarPosts from "../MyIyteCarPosts/MyIyteCarPosts";

const PostsAndAdverts = () => {
  return (
    <div
      className="container-fluid pt-3 mb-0"
      style={{ backgroundColor: "#eee", height: "100%" }}
    >
      <div className="row">
        <MyAnonimPosts />
        <MyIyteCarPosts />
      </div>
    </div>
  );
};

export default PostsAndAdverts;
