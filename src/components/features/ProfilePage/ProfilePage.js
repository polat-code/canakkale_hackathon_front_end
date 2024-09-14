import React, { useState } from "react";

const ProfilePage = () => {
  const [isCurrentClient, setIsCurrentClient] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div>
          <p>
            <strong>Name:</strong> Özgürhan Polat
          </p>
          <p>
            <strong>Email:</strong> ozgurhanpolat@std.iyte.edu.tr
          </p>

          <p>
            <strong>Anonim Post Sayısı:</strong> 3
          </p>
          <p>
            <strong>Iytecar İlan Sayısı:</strong> 15
          </p>
          <p>
            <strong>Mekan Yorum Sayısı:</strong> 4
          </p>
          <p>
            <strong>Maç İlan Sayısı:</strong> 2
          </p>

          <div className="d-flex justify-content-center align-items-center">
            {isCurrentClient ? (
              <button
                //onClick={handleSendMessage},
                className="btn btn-secondary mx-2"
              >
                Edit Profile
              </button>
            ) : (
              <button
                //onClick={handleSendMessage},
                className="btn btn-primary mx-2"
              >
                Send Message
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
