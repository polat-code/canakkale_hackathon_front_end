// src/components/ErrorPage.js

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom"; // React Router kullanıyorsanız
import errorImage from "../../assets/errorImages/404_photo.svg";

export const ErrorContainer = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("Aradığınız sayfa mevcut değil.");

  const handleGoHome = () => {
    navigate("/"); // Ana sayfanın yolunu buraya girin
  };
  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setMessage(message);
    }
  }, []);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto text-center">
        <Col>
          <Image src={errorImage} className="img-fluid" />
          <h1 className="mt-4">{message}</h1>

          <Button
            style={{ backgroundColor: "#FF4F03", borderColor: "#FF4F03" }}
            onClick={handleGoHome}
          >
            Anasayfaya Dön
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorContainer;
