import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar/Navbar";
import MatchList from "../../components/features/MatchList/MatchList";
import { getMatches } from "../../services/MatchAPIService";
import LoadingAnimation from "../../components/common/LoadingAnimation/LoadingAnimation";
import CreateMatch from "../../components/features/CreateMatch/CreateMatch";
import { isValidAccessToken } from "../../services/AuthenticationService";
import { useNavigate } from "react-router";

const SportsContainer = () => {
  const [sports, setSports] = useState([]);
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();

  const [isEnableToCreateMatch, setIsEnableToCreateMatch] = useState(false);

  useEffect(() => {
    const getSportsFromDB = async () => {
      setIsLoading(true);
      const matches = await getMatches(pageNo, pageSize);
      //console.log(matches);
      setSports(matches.data);
    };
    getSportsFromDB();

    setIsLoading(false);
  }, [pageNo]);

  const handlePageNo = () => {
    setPageNo(pageNo + 1);
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
        />
      )}
    </div>
  );
};

export default SportsContainer;
