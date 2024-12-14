import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPostDetail from "../../components/features/AnonimPostDetail/AnonimPostDetail";
import { getPostDetailAPI } from "../../services/PostFetchService";

const AnonimPostDetailContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPostDetail = async () => {
      const postDetailResponse = await getPostDetailAPI(postId);
      //console.log(postDetailResponse);
      setPost(postDetailResponse);
    };
    getPostDetail();
  }, [postId]);

  return (
    <div>
      <Navbar />
      <AnonimPostDetail post={post} />
    </div>
  );
};

export default AnonimPostDetailContainer;
