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
}) => {
  return (
    <div className="container mt-3 match-list-container">
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={handleNewMatch}>
          <img src={plusIcon} alt="" className="icon-green" />
          Maç İlanı Ver
        </button>
      </div>

      <h2 className="text-center mb-lg-4 my-3">Find a Match</h2>

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
                    <i className="bi bi-geo-alt"></i> <strong>Location:</strong>{" "}
                    {sport.location}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-people"></i>{" "}
                    <strong>Players Needed:</strong> {sport.playersNeeded}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-gender-ambiguous"></i>{" "}
                    <strong>Gender Preference:</strong> {sport.genderPreference}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-chat-dots"></i>{" "}
                    <strong>Telefon:</strong> {sport.telephone}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-chat-dots"></i>{" "}
                    <strong>Description:</strong> {sport.description}
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
    </div>
  );
};

export default MatchList;
