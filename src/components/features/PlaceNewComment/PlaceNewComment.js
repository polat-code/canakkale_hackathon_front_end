import React from "react";

const PlaceNewComment = () => {
  return (
    <div className="mb-3 ms-4 me-5">
      <textarea
        className="form-control"
        aria-label="With textarea"
        id="postDetail"
        placeholder="Lütfen düşüncelerinizi yazınız..."
        style={{ height: "120px" }}
        //onChange={(e) => setCommentContent(e.target.value)}
      ></textarea>
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          //onClick={handleMakeComment}
          //value={commentContent}
          //disabled={isLoading}
        >
          {/* isLoading ? (
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
      ) */}
          Yorum Yap
        </button>
      </div>
    </div>
  );
};

export default PlaceNewComment;
