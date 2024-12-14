import React from "react";
import NewAnonimPostForm from "../../components/features/NewAnonimPostForm/NewAnonimPostForm";
import { createPost } from "../../services/PostFetchService";
import {
  toastError,
  toastSuccess,
} from "../../utils/toastNotification/toastNotifications";
import { ToastContainer } from "react-toastify";

export const NewAnonymousContainer = ({ setIsValidPostAddition }) => {
  const handleSubmitNewPost = async (post) => {
    const postResponse = await createPost(post);
    if (postResponse.statusCode === 200) {
      toastSuccess("Post Başarılı Bir şekilde Paylaşıldı!");
      setTimeout(() => {
        setIsValidPostAddition(false);
        window.location.assign("/anonims");
      });
    } else if (postResponse.statusCode === 451) {
      toastError("std uzantılı email ile giriş yapınız!");
    }
  };

  return (
    <div>
      <NewAnonimPostForm handleSubmitNewPost={handleSubmitNewPost} />
      <ToastContainer />
    </div>
  );
};

export default NewAnonymousContainer;
