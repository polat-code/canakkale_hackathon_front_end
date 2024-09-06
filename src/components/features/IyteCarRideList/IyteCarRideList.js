import React from "react";

const IyteCarRideList = () => {
  const rides = [
    {
      id: 1,
      driver: "John Doe",
      departure: "Izmir",
      destination: "Istanbul",
      date: "2024-08-18",
      hour: "12:45",
      seats: 3,
      price: 60,
      telephone: "+905531521381",
      description: "Anonim Description is like that",
    },
    {
      id: 2,
      driver: "Jane Smith",
      departure: "Ankara",
      destination: "Bursa",
      date: "2024-08-19",
      hour: "13:45",
      seats: 2,
      price: 50,
      telephone: "+905531521381",
      description: "Anonim Description is like that",
    },
    {
      id: 3,
      driver: "Jane Smith",
      departure: "Ankara",
      destination: "Bursa",
      date: "2024-08-19",
      hour: "07:45",
      seats: 2,
      price: 20,
      telephone: "+905531521381",
      description: "Anonim Description is like that",
    },
  ];

  return (
    <div className="container mt-4">
      {rides.map((ride) => (
        <div className="card mb-3 shadow-sm" key={ride.id}>
          <div className="row g-0">
            <div className="col-md-8 p-3">
              <h5 className="card-title">
                <i className="bi bi-arrow-right-circle"></i>{" "}
                <span className="text-primary">{ride.departure}</span> ➡{" "}
                <span className="text-success">{ride.destination}</span>
              </h5>
              <p className="card-text">
                <span className="fw-bold">Sürücü :</span> {ride.driver}
              </p>
              <p className="card-text">
                <span className="fw-bold">Tarih : </span> {ride.date}
              </p>
              <p className="card-text">
                <span className="fw-bold">Saat : </span> {ride.hour}
              </p>
              <p className="card-text">
                <span className="fw-bold">Boş Koltuk Sayısı : </span>{" "}
                {ride.seats}
              </p>
              <p className="card-text">
                <span className="fw-bold">Fiyat : </span> {ride.price} TL
              </p>
              <p className="card-text">
                <span className="fw-bold">Telefon : </span> {ride.telephone}
              </p>
              <p className="card-text">
                <span className="fw-bold">Açıklama : </span> {ride.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IyteCarRideList;
