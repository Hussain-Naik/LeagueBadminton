import React, { useEffect, useState } from "react";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import ListCards from "../../components/ListCards";
import { useNavigate } from "react-router";
import { LeagueType } from "../../typescript/Types";
import { useDispatch } from "react-redux";
import { setLeague } from "../../reducers/leagueSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch();
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
            dispatch(
              setLeague({
                count: league.count,
                id: league.id,
                name: league.name,
              })
            );
            navigate("league/");
          }}
        />
      ))}
    </div>
  ) : null;
};

export default Home;
