import React, { useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import Register from "../../components/features/Register/Register";
import { register } from "../../services/AuthenticationService";
import {
  toastError,
  toastSuccess,
} from "../../utils/toastNotification/toastNotifications";
import { useNavigate } from "react-router";
import EmailVerification from "../../components/features/EmailVerification/EmailVerification";
import { useSelector } from "react-redux";

const RegisterContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [user, setUser] = useState({});
  const navigation = useNavigate();
  const addedUser = useSelector((state) => state.user.user);

  const handleRegisterToDB = async (user) => {
    setIsLoading(true);
    const resp = await register(user);
    console.log(resp);
    if (resp.statusCode === 200) {
      toastSuccess("Kayıt Başarılı,Yönlendiriliyor...");
      setTimeout(() => {}, 1000);
      setIsVerification(true);
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
        <EmailVerification email={addedUser.email} />
      ) : (
        <Register
          handleRegisterToDB={handleRegisterToDB}
          isLoading={isLoading}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default RegisterContainer;
