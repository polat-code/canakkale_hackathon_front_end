import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { complainPost } from "../../../services/PostComplainAPIService";
import { ToastContainer } from "react-toastify";
import {
  toastError,
  toastSuccess,
} from "../../../utils/toastNotification/toastNotifications";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const PostComplimentModal = ({ postId, show, handleClose }) => {
  const [reportReason, setReportReason] = useState("INAPPROPRIATE");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCompliment = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const postComplainResponse = await complainPost({
      postId,
      description,
      reportReason,
    });

    if (postComplainResponse.statusCode === 200) {
      toastSuccess("Şikayet Kaydedildi. Kapatılıyor", 1000);
      setDescription("");
      setReportReason("INAPPROPRIATE");

      setTimeout(() => {
        handleClose();
        setIsLoading(false);
      }, 2500);
    } else {
      toastError("Bir hata oluştu!");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered scrollable>
        {/* Modal Header */}
        <Modal.Header closeButton>
          <Modal.Title>Şikayet</Modal.Title>
        </Modal.Header>
        {/* Modal Header END */}
        {/* Modal Body */}
        <Modal.Body>
          <Form onSubmit={handleSendCompliment}>
            <ToastContainer />
            {/* Select a Reason input */}
            <Form.Group className="mb-3" controlId="reportReason">
              <Form.Label>Neden seçiniz :</Form.Label>
              <Form.Select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="INAPPROPRIATE">Uygunsuz İçerik</option>
                <option value="HARASSMENT">Taciz ve Zorbalık</option>
                <option value="HATE_SPEECH">Nefret Söylemi</option>
                <option value="MISINFORMATION">
                  Yanıltıcı ve Yanlış Bilgi
                </option>
                <option value="COPYRIGHT">Telif Hakkı İhlali</option>
                <option value="PRIVACY">Özel Bilgilerin Paylaşılması</option>
                <option value="SPAM">Spam veya Reklam</option>
                <option value="HEALTH_MISINFORMATION">
                  Sağlıkla İlgili Yanlış Bilgilendirme
                </option>
                <option value="THREAT">Başkalarını Tehdit Etme</option>
                <option value="DRUGS">İllegal Madde Kullanımı</option>
              </Form.Select>
            </Form.Group>
            {/* Select a Reason input END */}

            {/* Description Input */}
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Açıklama :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Lütfen düşüncelerinizi yazınız..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {/* Description Input END */}

            {/* Send Button */}
            <div className="d-flex justify-content-center">
              {isLoading ? (
                <LoadingAnimation />
              ) : (
                <Button variant="primary" type="submit">
                  Gönder
                </Button>
              )}
            </div>
            {/* Send Button END */}
          </Form>
        </Modal.Body>
        {/* Modal Body END */}
        {/* Modal Footer */}
        <Modal.Footer className="justify-content-center">
          <p className="fw-bold">Şikayetiniz dikkate alınacaktır.</p>
        </Modal.Footer>
        {/* Modal Footer END */}
      </Modal>
    </>
  );
};

export default PostComplimentModal;
