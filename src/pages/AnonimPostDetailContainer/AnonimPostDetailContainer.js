import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPostDetail from "../../components/features/AnonimPostDetail/AnonimPostDetail";
import { getPostDetailAPI } from "../../services/PostFetchService";

const AnonimPostDetailContainer = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const [post, setPost] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Optional: Loading state
  const [error, setError] = useState(null); // Optional: Error state

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const postDetailResponse = await getPostDetailAPI(postId);
        console.log(postDetailResponse.data);
        setPost(postDetailResponse.data);
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getPostDetail();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (error) {
    return <div>Error loading post details.</div>; // Or a more detailed error component
  }

  return (
    <div>
      <Navbar />
      {post && post.postResponse ? (
        <AnonimPostDetail post={post} setPost={setPost} postId={postId} />
      ) : (
        <div>No post details available.</div>
      )}
    </div>
  );
};
export default AnonimPostDetailContainer;
