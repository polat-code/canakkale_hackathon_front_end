import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [userType, setUserType] = useState("user"); // Default type is user

  const handleLoginContainer = async (email, password) => {
    setIsLoginButtonDisabled(true);
    const resp = await login(email, password);
    
    if (resp && resp.statusCode === 200) {
      const { accessToken, userRole } = resp.data;
      setCookie("access_token", accessToken);
      setCookie("user_role", userRole || userType); // Store user role in cookie
      
      const role = userRole || userType;
      dispatch(putUserInfo({ role })); // Store role in Redux state
      
      toastSuccess("Başarılı! Yönlendiriliyorsun...");

      // Redirect based on role
      setTimeout(() => {
        if (role === "admin") {
          navigation("/admin");
        } else {
          navigation("/user");
        }
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

  // For demo/development purposes - allows selecting role in UI
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  useEffect(() => {
    const validateLogin = async () => {
      const isValidUser = await isValidAccessToken();
      if (isValidUser) {
        const userRole = Cookies.get("user_role");
        if (userRole === "admin") {
          navigation("/admin");
        } else {
          navigation("/user");
        }
      }
    };

    validateLogin();
  }, [navigation]);

  return (
    <div>
      {isEmailVerification ? (
        <EmailVerificationContainer
          setIsEmailVerification={setIsEmailVerification}
        />
      ) : (
        <Login
          handleLoginContainer={handleLoginContainer}
          isLoginButtonDisabled={isLoginButtonDisabled}
          userType={userType}
          handleUserTypeChange={handleUserTypeChange}
        />
      )}
    </div>
  );
};

export default LoginContainer;