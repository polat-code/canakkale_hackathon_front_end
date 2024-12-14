import React, { useState } from "react";

const NewAnonimPostForm = ({ handleSubmitNewPost }) => {
  const [postDescription, setPostDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [adminNote, setAdminNote] = useState("");

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 2) {
      alert("You can only upload a maximum of 2 photos.");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevPhotos) => [
          ...prevPhotos,
          { fileName: file.name, data: reader.result },
        ]);
      };
      reader.onerror = () => {
        alert("Failed to read file!");
      };
      reader.readAsDataURL(file);
    });

    // Reset the file input
    e.target.value = "";
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Post Description:", postDescription);
    console.log("Photos (Base64):", photos);
    console.log("Admin Note:", adminNote);
    handleSubmitNewPost({
      content: postDescription,
      photos,
      noteToAdmin: adminNote,
    });

    // Example: You can send the data to your backend as follows:
    // const formData = {
    //   postDescription,
    //   photos, // Array of Base64 strings
    //   adminNote,
    // };
    // fetch('/api/submit-post', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle success
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <h4 className="text-center mb-4">Yeni Anonim Post</h4>
        <form onSubmit={handleSubmit}>
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
              multiple
              disabled={photos.length >= 2}
            />
            <div className="mt-3 d-flex justify-content-start">
              {photos.map((photo, index) => (
                <div key={index} className="me-2 position-relative">
                  <img
                    src={photo.data}
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
          <button className="btn btn-primary w-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAnonimPostForm;
