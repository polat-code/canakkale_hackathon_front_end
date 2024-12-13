import React, { useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import Login from "../../components/features/Login/Login";
import Cookies from "js-cookie";
import { login } from "../../services/AuthenticationService";
import {
  toastError,
  toastInfo,
  toastSuccess,
} from "../../utils/toastNotification/toastNotifications";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { putUserInfo } from "../../redux/userSlice";
import EmailVerificationContainer from "../EmailVerificationContainer/EmailVerificationContainer";

const LoginContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const handleLoginContainer = async (email, password) => {
    setIsLoginButtonDisabled(true);
    const resp = await login(email, password);
    if (resp && resp.statusCode === 200) {
      const { access_token, refresh_token } = resp.data;
      Cookies.set("access_token", access_token, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh_token", refresh_token, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });
      toastSuccess("Başarılı! Yönlendiriliyorsun...");

      setTimeout(() => {
        navigation("/anonims");
      }, 1800);
    } else if (resp && resp.statusCode === 404) {
      toastError("Böyle bir kullanıcı bulunamadı!");
    } else if (resp && resp.statusCode === 411) {
      toastError("Kullanıcı adı veya şifre yanlış!");
    } else if (resp && resp.statusCode === 406) {
      toastError("Bu hesap Banlanmıştır.");
    } else if (resp && resp.statusCode === 410) {
      toastInfo("Email Onaylama! Yönlendiriliyorsun...");
      setTimeout(() => {
        setIsEmailVerification(true);
        setIsLoginButtonDisabled(true);
      }, 1500);
      dispatch(putUserInfo({ email }));
    } else {
      toastError("Bilinmeyen bir hata oluştu.");
    }
    setIsLoginButtonDisabled(false);
  };
  return (
    <div>
      <Navbar />
      {isEmailVerification ? (
        <EmailVerificationContainer
          setIsEmailVerification={setIsEmailVerification}
        />
      ) : (
        <Login
          handleLoginContainer={handleLoginContainer}
          isLoginButtonDisabled={isLoginButtonDisabled}
        />
      )}
    </div>
  );
};

export default LoginContainer;
