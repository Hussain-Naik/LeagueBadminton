import React, { useEffect, useState } from "react";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import ListCards from "../../components/ListCards";
import { useNavigate } from "react-router";

type LeagueType = {
  id: string;
  name: string;
  count: number;
};

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [leagueList, setLeagueList] = useState<LeagueType[]>([]);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      await axiosAPI.post("/exec?e=LEAGUE");
      const { data } = await axiosReq.get("");
      setLeagueList(data.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return loaded ? (
    <div className="grid">
      {leagueList.map((league) => (
        <ListCards
          key={league.id}
          type="League"
          label={league.name}
          sessionCount={league.count}
          onClick={() => {
            navigate("league/");
          }}
        />
      ))}
    </div>
  ) : null;
};

export default Home;
