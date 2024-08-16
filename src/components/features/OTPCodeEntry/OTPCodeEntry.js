import React, { useState } from "react";

const OTPCodeEntry = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h4 className="text-center mb-4">Enter OTP Code</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">
              OTP Code
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP code"
              required
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPCodeEntry;
