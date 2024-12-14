import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastError } from "../../../utils/toastNotification/toastNotifications";

const Login = ({ handleLoginContainer, isLoginButtonDisabled }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO Apply for isLoading to button
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toastError("Lütfen Kullanıcı Adını ve Şifreyi giriniz.");
    } else {
      handleLoginContainer(email, password);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mb-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-end">
            <a href="#" className="text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button
            className="btn btn-outline-success"
            onClick={() => (window.location.href = "/register")}
            disabled={isLoginButtonDisabled}
          >
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
