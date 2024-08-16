import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";

const AnonimPostDetailContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  return (
    <div>
      <Navbar />
      PostId : {postId}
    </div>
  );
};

export default AnonimPostDetailContainer;
