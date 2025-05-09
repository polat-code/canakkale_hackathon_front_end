import React, { useEffect, useState } from "react";
import Navbar from "../../../components/common/Navbar/Navbar";
import Login from "../../../components/features/Login/Login";
import Cookies from "js-cookie";
import {
  isValidAccessToken,
  login,
} from "../../../services/AuthenticationService";
import {
  toastError,
  toastInfo,
  toastSuccess,
} from "../../../utils/toastNotification/toastNotifications";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { putUserInfo } from "../../../redux/userSlice";
import EmailVerificationContainer from "../../EmailVerificationContainer/EmailVerificationContainer";
import { setCookie } from "../../../services/CookieService";

const LoginContainer = () => {
  const navigation = useNavigate();
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const handleLoginContainer = async (email, password) => {
    setIsLoginButtonDisabled(true);
    const resp = await login(email, password);
    if (resp && resp.statusCode === 200) {
      const { accessToken } = resp.data;
      setCookie("access_token", accessToken);

      toastSuccess("Başarılı! Yönlendiriliyorsun...");

      setTimeout(() => {
        navigation("/main");
      }, 1800);
    } else if (resp && resp.statusCode === 411) {
      toastInfo("Email Onaylama! Yönlendiriliyorsun...");
      setTimeout(() => {
        setIsEmailVerification(true);
        setIsLoginButtonDisabled(true);
      }, 1500);
    } else if (resp && resp.statusCode === 404) {
      toastError("Böyle bir kullanıcı bulunamadı!");
    } else if (resp && resp.statusCode === 403) {
      toastError("Kullanıcı adı veya şifre yanlış!");
    } else {
      toastError("Bilinmeyen bir hata oluştu.");
    }
    setIsLoginButtonDisabled(false);
  };

  useEffect(() => {
    const validateLogin = async () => {
      const isValidUser = await isValidAccessToken();
      if (isValidUser) {
        window.location.assign("/main");
      }
    };

    validateLogin();
  }, []);
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
