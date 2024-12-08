import React from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import Login from "../../components/features/Login/Login";
import Cookies from "js-cookie";
import { login } from "../../services/AuthenticationService";
import {
  toastError,
  toastInfo,
} from "../../utils/toastNotification/toastNotifications";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { putUserInfo } from "../../redux/userSlice";

const LoginContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLoginContainer = async (email, password) => {
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
      navigation("/anonims");
    } else if (resp && resp.statusCode === 404) {
      toastError("Böyle bir kullanıcı bulunamadı!");
    } else if (resp && resp.statusCode === 411) {
      toastError("Kullanıcı adı veya şifre yanlış!");
    } else if (resp && resp.statusCode === 406) {
      toastError("Bu hesap Banlanmıştır.");
    } else if (resp && resp.statusCode === 410) {
      toastInfo("Email Onaylama! Yönlendiriliyorsun...");
      setTimeout(() => {}, 1500);
      dispatch(putUserInfo({ email }));
      navigation("/");
    } else {
      toastError("Bilinmeyen bir hata oluştu.");
    }
  };
  return (
    <div>
      <Navbar />
      <Login handleLoginContainer={handleLoginContainer} />
    </div>
  );
};

export default LoginContainer;
