import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPost from "../../components/features/AnonimPost/AnonimPost";
import NewAnonimPostButton from "../../components/features/NewAnonimPostButton/NewAnonimPostButton";
import LoadingAnimation from "../../components/common/LoadingAnimation/LoadingAnimation";
import { getPostPermission, getPosts } from "../../services/PostFetchService";
import { toastError } from "../../utils/toastNotification/toastNotifications";
import NewAnonymousContainer from "../NewAnonymousPostContainer/NewAnonymousContainer";

const AnonimContainer = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPostAddition, setIsValidPostAddition] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const fetchPosts = async () => {
      try {
        const postResponse = await getPosts(1, 10);
        //console.log("postResponse in container : ", postResponse);
        setPosts(postResponse.data); // Data'yı state'e setle
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewAnonymousPost = async () => {
    const response = await getPostPermission();
    if (response.statusCode === 451) {
      toastError("std uzantılı mail ile giriş yapın");
    } else if (response.statusCode === 200) {
      setIsValidPostAddition(true);
    } else {
      toastError("Bir hata oluştu.");
    }
  };

  return (
    <div>
      <Navbar />
      {isValidPostAddition ? (
        <NewAnonymousContainer />
      ) : (
        <>
          <NewAnonimPostButton
            handleNewAnonymousPost={handleNewAnonymousPost}
          />
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            <>
              {posts &&
                posts.map((post, index) => {
                  return <AnonimPost key={index} post={post} />;
                })}{" "}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AnonimContainer;
