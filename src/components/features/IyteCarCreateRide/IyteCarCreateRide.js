import React, { useEffect, useState } from "react";
import { cityData } from "../../../utils/CityData/cityData";

const IyteCarCreateRide = () => {
  const [isCityInside, setIsCityInside] = useState(true);
  const [isCityOutside, setIsCityOutside] = useState(false);
  const [departurePlace, setDeparturePlace] = useState(
    cityData.cityInside.districts
  );
  const [destinationPlace, setDestinationPlace] = useState(
    cityData.cityInside.districts
  );
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");
  const handleCityInside = () => {
    setIsCityInside(true);
    setIsCityOutside(false);
    setDestinationPlace(cityData.cityInside.districts);
    setDeparturePlace(cityData.cityInside.districts);
  };
  const handleCityOutside = () => {
    setIsCityInside(false);
    setIsCityOutside(true);
    setDestinationPlace(cityData.cityOutside.districts);
    setDeparturePlace(cityData.cityOutside.districts);
  };

  const handleSubmit = (e) => {};

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Yolculuk İlanı Oluştur</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Yolculuk Tipi</label>
            <select
              className="form-select"
              id="citySelection"
              onChange={(e) => {
                if (e.target.value === "INCITY") {
                  handleCityInside();
                } else if (e.target.value === "OUTCITY") {
                  handleCityOutside();
                }
              }}
            >
              <option value="INCITY">İzmir içi Seyahat</option>
              <option value="OUTCITY">İzmir dışı Seyahat</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Kalkış</label>
            <select className="form-select" id="departureCity">
              {departurePlace.map((district) => {
                return <option value={district}>{district}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Varış</label>
            <select className="form-select" id="departureCity">
              {departurePlace.map((district) => {
                return <option value={district}>{district}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Tarih</label>
            <input
              type="date"
              className="form-control rounded-pill"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Saat</label>
            <input
              type="time"
              className="form-control rounded-pill"
              value={date}
              //onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Number of Seats</label>
            <select className="form-select" id="numberOfSeatsSelection">
              <option value="ONE">1</option>
              <option value="TWO">2</option>
              <option value="THREE">3</option>
              <option value="FOUR">4</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control rounded-pill"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Telefon (ülke koduyla ) Örnek : +90553 123 4536
            </label>
            <input
              type="tel"
              className="form-control rounded-pill"
              value={price}
              //onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Açıklama</label>
            <textarea
              type="text"
              className="form-control"
              value={price}
              //onChange={(e) => setPrice(e.target.value)}
              //Don't forget the restriction of the number of character
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill">
            <i className="bi bi-plus-circle"></i> Create Ride
          </button>
        </form>
      </div>
    </div>
  );
};

export default IyteCarCreateRide;
