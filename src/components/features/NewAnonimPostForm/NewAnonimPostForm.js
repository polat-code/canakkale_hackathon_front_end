import React, { useState } from "react";

const NewAnonimPostForm = () => {
  const [postDescription, setPostDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [adminNote, setAdminNote] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (photos.length >= 2) {
      alert("You can only upload a maximum of 2 photos.");
      return;
    }
    setPhotos([...photos, URL.createObjectURL(file)]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Post Description:", postDescription);
    console.log("Photos:", photos);
    console.log("Admin Note:", adminNote);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h4 className="text-center mb-4">Yeni Anonim Post</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="postDescription" className="form-label">
              Post Detayı{" "}
              <span className="text-danger">
                (Admin tarafından bile okunmaz)
              </span>
            </label>
            <textarea
              className="form-control"
              id="postDescription"
              rows="4"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              placeholder="Lütfen post detayını buraya yazınız..."
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="photos" className="form-label">
              Fotoğraf Yükle (max 2)
            </label>
            <input
              type="file"
              className="form-control"
              id="photos"
              onChange={handlePhotoUpload}
              accept="image/*"
              required
              disabled={photos.length >= 2}
            />
            <div className="mt-3 d-flex justify-content-start">
              {photos.map((photo, index) => (
                <div key={index} className="me-2 position-relative">
                  <img
                    src={photo}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "75px",
                      height: "75px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    style={{
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleRemovePhoto(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="adminNote" className="form-label">
              Admine Not (İsteğe Bağlı)
            </label>

            <textarea
              className="form-control"
              id="adminNote"
              rows="3"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Admine Not..."
              required
            ></textarea>
            <span className="text-danger">
              Uygunsuz Postların değerlendirilmesinde kullanılır.
            </span>
          </div>
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAnonimPostForm;
