import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import AnonimPost from "../../components/features/AnonimPost/AnonimPost";
import NewAnonimPostButton from "../../components/features/NewAnonimPostButton/NewAnonimPostButton";
import { posts } from "../../utils/fakeData/anonimPosts";

const AnonimContainer = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {});
  return (
    <div>
      <Navbar />
      <NewAnonimPostButton />
      {posts.map((post, index) => {
        return <AnonimPost key={index} post={post} />;
      })}
    </div>
  );
};

export default AnonimContainer;
