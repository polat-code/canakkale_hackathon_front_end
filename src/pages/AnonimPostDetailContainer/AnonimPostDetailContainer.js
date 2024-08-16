import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPostDetail from "../../components/features/AnonimPostDetail/AnonimPostDetail";

const AnonimPostDetailContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  return (
    <div>
      <Navbar />
      <AnonimPostDetail />
    </div>
  );
};

export default AnonimPostDetailContainer;
