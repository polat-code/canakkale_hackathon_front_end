import React, { useState } from "react";
import "../../../styles/Register/Register.css";
import { ToastContainer } from "react-toastify";
import { toastError } from "../../../utils/toastNotification/toastNotifications";

const Register = ({
  handleRegisterToDB,
  isLoading,
  isRegisterButtonDisabled,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function isValidEmail(email) {
    // A commonly used email validation regex pattern (though not perfect)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toastError("Lütfen İsmi Doldurunuz!");
    } else if (!surname.trim()) {
      toastError("Lütfen Soyismi Doldurunuz!");
    } else if (!email.trim() || !isValidEmail(email)) {
      toastError("Lütfen Geçerli bir Email giriniz!");
    } else if (!telephone.trim() || telephone.length <= 10) {
      toastError("Lütfen Geçerli bir telefon numarası giriniz!");
    } else if (password.includes(" ")) {
      toastError("Şifrede boşluk olamaz");
    } else if (password.trim().length < 8) {
      toastError("Şifre uzunluğu en az 8 karakter olmalı");
    } else if (password !== repeatPassword) {
      toastError("Şifreler Aynı Değil");
    } else {
      const user = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        phoneNumber: telephone,
      };
      handleRegisterToDB(user);
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
            Hoşgeldin <span className="fw-bold red-color">IYTECHLI</span> !!!
          </h6>
        </div>

        <h2 className="text-center mb-4">Kayıt Ol</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              İsim
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="İsim"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Soyisim
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Soyisim"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telephone" className="form-label">
              Telefon (alan koduyla birlikte)
            </label>
            <input
              type="telephone"
              className="form-control"
              placeholder="+905531234567"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Şifre"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="repeatpassword" className="form-label">
              Şifre Tekrar
            </label>
            <input
              type="password"
              className="form-control"
              id="repeatpassword"
              placeholder="Şifre Tekrar"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleRegister}
            disabled={isRegisterButtonDisabled}
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

export default Register;
