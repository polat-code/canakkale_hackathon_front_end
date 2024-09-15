import React from "react";
import MyAnonimPostsCard from "../MyAnonimPostsCard/MyAnonimPostsCard";

const MyAnonimPosts = () => {
  return (
    <>
      <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
        <h5 className="font-weight-bold mb-3 text-center text-lg-start">
          Anonim Post
        </h5>

        <div className="card">
          <div className="card-body">
            <ul
              className="list-unstyled mb-0 overflow-auto"
              style={{ height: "500px" }}
            >
              <MyAnonimPostsCard />
              <MyAnonimPostsCard />
              <MyAnonimPostsCard />
              <MyAnonimPostsCard />
              <MyAnonimPostsCard />
              <MyAnonimPostsCard />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAnonimPosts;
