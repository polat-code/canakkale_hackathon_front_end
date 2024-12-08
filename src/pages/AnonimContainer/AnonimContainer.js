import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPost from "../../components/features/AnonimPost/AnonimPost";
import NewAnonimPostButton from "../../components/features/NewAnonimPostButton/NewAnonimPostButton";
import LoadingAnimation from "../../components/common/LoadingAnimation/LoadingAnimation";
import { getPosts } from "../../services/PostFetchService";

const AnonimContainer = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const postResponse = await getPosts(1, 10);
        //console.log("postResponse in container : ", postResponse);
        //setPosts(postResponse.data); // Data'yı state'e setle
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <NewAnonimPostButton />
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {posts.map((post, index) => {
            return <AnonimPost key={index} post={post} />;
          })}{" "}
        </>
      )}
    </div>
  );
};

export default AnonimContainer;
