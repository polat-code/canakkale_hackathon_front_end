import "../../../styles/MatchList/MatchList.css";

import MatchSearch from "../MatchSearch/MatchSearch";
import plusIcon from "../../../assets/anonimImages/plus_icon.svg";

const MatchList = ({
  handlePageNo,
  sports,
  setSports,
  handleNewMatch,
  filterLevel,
  setFilterLevel,
  filterGender,
  setFilterGender,
  filterSport,
  setFilterSport,
  isMoreData,
}) => {
  const getGender = (genderPreference) => {
    switch (genderPreference) {
      case "ANY":
        return "Farketmez";
      case "FEMALE":
        return "Kız";
      case "MALE":
        return "Erkek";
      default:
        return "Unknown";
    }
  };
  return (
    <div className="container mt-3 match-list-container">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={handleNewMatch}>
          <img src={plusIcon} alt="" className="icon-green" />
          Maç İlanı Ver
        </button>
      </div>

      <h2 className="text-center mb-lg-4 my-3">Spor İlanı Arat</h2>

      <MatchSearch
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
        filterGender={filterGender}
        setFilterGender={setFilterGender}
        filterSport={filterSport}
        setFilterSport={setFilterSport}
      />
      <div className="row">
        {sports &&
          sports.map((sport, key) => (
            <div key={key} className="col-md-4 mb-4">
              <div className="card shadow-sm match-card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title text-uppercase">
                      {sport.sportType}
                    </h5>
                    <span className="badge bg-primary">{sport.sportLevel}</span>
                  </div>
                  <p className="card-text">
                    <i className="bi bi-clock"></i>{" "}
                    <strong>İlan Sahibi :</strong> {sport.userFullName}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-clock"></i> <strong>Tarih:</strong>{" "}
                    {sport.date}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-clock"></i> <strong>Saat:</strong>{" "}
                    {sport.hours}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-geo-alt"></i> <strong>Konum:</strong>{" "}
                    {sport.location}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-people"></i>{" "}
                    <strong>Gereken Kişi sayısı:</strong> {sport.playersNeeded}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-gender-ambiguous"></i>{" "}
                    <strong>Cinsiyet Tercihi:</strong>{" "}
                    {getGender(sport.genderPreference)}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-chat-dots"></i>{" "}
                    <strong>Telefon:</strong> {sport.telephone}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-chat-dots"></i>{" "}
                    <strong>Açıklama:</strong> {sport.description}
                  </p>
                  {/* 
                <button className="btn btn-outline-primary w-100 mt-3">
                  Join
                </button> */}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-center">
        {isMoreData ? (
          <button
            className="btn btn-primary col-lg-3 col-5 mt-3 mb-3"
            onClick={handlePageNo}
          >
            Daha Fazla
          </button>
        ) : sports.length > 0 ? (
          <p>Daha Fazla Spor İlanı yok.</p>
        ) : (
          <p>Sonuç bulunamadı.</p> // İlk sorguda veri yoksa
        )}
      </div>
    </div>
  );
};

export default MatchList;
