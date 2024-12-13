import React, { useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import Register from "../../components/features/Register/Register";
import { register } from "../../services/AuthenticationService";
import {
  toastError,
  toastSuccess,
} from "../../utils/toastNotification/toastNotifications";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { putUserInfo } from "../../redux/userSlice";
import EmailVerificationContainer from "../EmailVerificationContainer/EmailVerificationContainer";

const RegisterContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isVerification, setIsVerification] = useState(false);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(false);

  const handleRegisterToDB = async (user) => {
    setIsLoading(true);
    const resp = await register(user);
    // console.log(resp);
    if (resp.statusCode === 200) {
      toastSuccess("Kayıt Başarılı,Yönlendiriliyor...");
      dispatch(putUserInfo(user));
      setTimeout(() => {
        setIsVerification(true);
        setIsRegisterButtonDisabled(true);
      }, 1500);
    } else if (resp.statusCode === 409) {
      toastError("Önceden Kayıtlı Email");
    } else {
      toastError("Bir hata oluştu!");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />
      {isVerification ? (
        <EmailVerificationContainer
          setIsEmailVerification={setIsVerification}
        />
      ) : (
        <Register
          handleRegisterToDB={handleRegisterToDB}
          isRegisterButtonDisabled={isRegisterButtonDisabled}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default RegisterContainer;
