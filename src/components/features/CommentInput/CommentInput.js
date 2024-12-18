import React, { useState } from "react";
import { createComment } from "../../../services/PostCommentAPIService";
import { toastSuccess } from "../../../utils/toastNotification/toastNotifications";
import { ToastContainer } from "react-toastify";

const CommentInput = ({ post, setPost }) => {
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMakeComment = async () => {
    setIsLoading(true);
    const commentResponse = await createComment({
      postId: post.postResponse.postId,
      commentContent,
    });
    if (commentResponse.statusCode === 200) {
      setPost((prevPost) => ({
        ...prevPost,
        commentResponses: [...prevPost.commentResponses, commentResponse.data],
        postResponse: {
          ...prevPost.postResponse,
          numberOfComments: prevPost.postResponse.numberOfComments + 1,
        },
      }));
      setCommentContent("");
      toastSuccess("Yorum Başarılı!", 1400);
    }
    setIsLoading(false);
  };

  return (
    <div className="mb-3 ms-4 me-5">
      <ToastContainer />
      <textarea
        className="form-control"
        aria-label="With textarea"
        id="postDetail"
        placeholder="Lütfen düşüncelerinizi yazınız..."
        style={{ height: "120px" }}
        onChange={(e) => setCommentContent(e.target.value)}
        value={commentContent}
      ></textarea>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          onClick={handleMakeComment}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Yükleniyor...
            </>
          ) : (
            "Yorum Yap"
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
