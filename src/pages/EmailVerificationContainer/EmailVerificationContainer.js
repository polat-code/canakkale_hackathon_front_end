import React, { useState } from "react";
import EmailVerification from "../../components/features/EmailVerification/EmailVerification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validateEmail } from "../../services/AuthenticationService";
import {
  toastError,
  toastSuccess,
} from "../../utils/toastNotification/toastNotifications";

const EmailVerificationContainer = ({ setIsEmailVerification }) => {
  const { email } = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const handleEmailVerificationContainer = async (otp) => {
    setIsLoading(true);
    const response = await validateEmail({ otp, email });
    if (response.statusCode === 200) {
      toastSuccess("Email Onaylandı Yönlendiriliyor...");
      setTimeout(() => {
        setIsEmailVerification(false);
        navigation("/");
      }, 1800);
    } else if (response.statusCode === 406) {
      toastError("Hatalı İşlem! Tekrar giriş yapmaya çalışın lütfen.");
    } else if (response.statusCode === 411) {
      toastError("Onay Kodu Yanlış!");
    } else if (response.statusCode === 498) {
      toastError("Onay Kodu'nun süresi bitmiştir.Tekrar Onay Kodu gönderildi!");
    } else {
      toastError("Bir hata ile karşılaşıldı!");
    }
    setIsLoading(false);
  };
  return (
    <>
      <EmailVerification
        email={email}
        handleEmailVerificationContainer={handleEmailVerificationContainer}
        isLoading={isLoading}
      />
    </>
  );
};

export default EmailVerificationContainer;
