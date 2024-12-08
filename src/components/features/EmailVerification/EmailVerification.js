import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastError } from "../../../utils/toastNotification/toastNotifications";

const EmailVerification = ({
  email,
  isLoading,
  handleEmailVerificationContainer,
}) => {
  const [otp, setOtp] = useState("");

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      toastError("Lütfen Email'e gelen kodu giriniz.");
    } else {
      handleEmailVerificationContainer(otp);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="d-flex justify-content-center">
          <h6 className="welcome-back-style">
            Son bir adım kaldı{" "}
            <span className="fw-bold red-color">IYTECHLI</span> !!!
          </h6>
        </div>

        <h2 className="text-center mb-4">Email Onaylama</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Email'ine gelen Onay Kodu
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="123456"
              id="name"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleEmailVerification}
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
              "Kayıt Ol"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
