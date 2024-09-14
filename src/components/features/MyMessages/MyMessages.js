import React from "react";
import MessagePreview from "../MessagePreview/MessagePreview";
import CrossClientMessage from "../CrossClientMessage/CrossClientMessage";
import CurrentClientMessage from "../CurrentClientMessage/CurrentClientMessage";

const MyMessages = () => {
  return (
    <div
      className="container-fluid pt-3 mb-0"
      style={{ backgroundColor: "#eee", height: "100%" }}
    >
      <div className="row">
        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Mesaj Kutusu
          </h5>

          <div className="card">
            <div className="card-body">
              <ul
                className="list-unstyled mb-0 overflow-auto"
                style={{ height: "500px" }}
              >
                <MessagePreview
                  fullname={"John Doe"}
                  lastMessage={"Hello, Are you there?"}
                  time={"Just Now"}
                  numberOfIsNotRead={2}
                />
                <MessagePreview
                  fullname={"Danny Smith"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"5 mins ago"}
                  numberOfIsNotRead={2}
                />
                <MessagePreview
                  fullname={"Alex Steward"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Ashley Olsen"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Kate Moss"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Lara Croft"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Brad Pitt"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Brad Pitt"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Brad Pitt"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
                <MessagePreview
                  fullname={"Brad Pitt"}
                  lastMessage={"Lorem ipsum dolor sit."}
                  time={"Yesterday"}
                />
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-7 col-xl-8">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Mesaj Detayı
          </h5>
          <ul
            className="list-unstyled overflow-auto"
            style={{ height: "500px" }}
          >
            <CrossClientMessage
              fullname={"Brad Pitt"}
              time={"12 mins ago"}
              message={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            />
            <CurrentClientMessage
              fullname={"Sen"}
              time={"13 mins ago"}
              message={
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              }
            />
            <CrossClientMessage
              fullname={"Brad Pitt"}
              time={"12 mins ago"}
              message={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            />
            <CurrentClientMessage
              fullname={"Sen"}
              time={"13 mins ago"}
              message={
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              }
            />
            <CrossClientMessage
              fullname={"Brad Pitt"}
              time={"12 mins ago"}
              message={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            />
            <CurrentClientMessage
              fullname={"Sen"}
              time={"13 mins ago"}
              message={
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
              }
            />
          </ul>
          <div className="form-outline">
            <textarea
              className="form-control"
              id="textAreaExample2"
              rows="4"
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-info btn-rounded float-end my-4 me-4"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyMessages;
