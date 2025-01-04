import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import MatchList from "../../components/features/MatchList/MatchList";
import { getMatches } from "../../services/MatchAPIService";
import LoadingAnimation from "../../components/common/LoadingAnimation/LoadingAnimation";
import CreateMatch from "../../components/features/CreateMatch/CreateMatch";
import { isValidAccessToken } from "../../services/AuthenticationService";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";

const SportsContainer = () => {
  const [sports, setSports] = useState([]);
  const pageSize = 3;
  const [pageNo, setPageNo] = useState(1);
  const [isMoreData, setIsMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [filterGender, setFilterGender] = useState("ALL");
  const [filterSport, setFilterSport] = useState("ALL");
  const navigation = useNavigate();
  const [isEnableToCreateMatch, setIsEnableToCreateMatch] = useState(false);

  // Filtreler değiştiğinde sayfa numarasını sıfırla
  useEffect(() => {
    setPageNo(1);
    setSports([]);
  }, [filterLevel, filterGender, filterSport]);

  // Verileri getir
  useEffect(() => {
    const getSportsFromDB = async () => {
      setIsLoading(true);
      const matches = await getMatches(
        pageNo,
        pageSize,
        filterLevel,
        filterGender,
        filterSport
      );

      if (matches?.data?.length > 0) {
        if (pageNo === 1) {
          setSports(matches.data);
        } else {
          setSports((prevSports) => [...prevSports, ...matches.data]);
        }
        setIsMoreData(matches.data.length === pageSize); // Gelen veri tam sayfa değilse daha fazla veri yoktur
      } else {
        setIsMoreData(false);
      }
      setIsLoading(false);
    };

    getSportsFromDB();
  }, [pageNo, filterLevel, filterGender, filterSport]);

  const handlePageNo = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  const handleNewMatch = async () => {
    const isValidToken = await isValidAccessToken();
    if (!isValidToken) {
      navigation("/");
    } else {
      setIsEnableToCreateMatch(true);
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <LoadingAnimation />
      ) : isEnableToCreateMatch ? (
        <CreateMatch setIsEnableToCreateMatch={setIsEnableToCreateMatch} />
      ) : (
        <MatchList
          handlePageNo={handlePageNo}
          sports={sports}
          setSports={setSports}
          handleNewMatch={handleNewMatch}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          filterGender={filterGender}
          setFilterGender={setFilterGender}
          filterSport={filterSport}
          setFilterSport={setFilterSport}
          isMoreData={isMoreData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default SportsContainer;
