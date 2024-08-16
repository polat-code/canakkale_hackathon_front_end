import React, { useState } from "react";
import "../../../styles/Register/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Implement registration logic here
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
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
