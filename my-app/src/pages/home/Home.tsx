import React, { useEffect, useState } from "react";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import ListCards from "../../components/ListCards";

type LeagueType = { 
    id: string; 
    name: string; 
    count: number;
};

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [leagueList, setLeagueList] = useState<LeagueType[]>([]);

  const handleMount = async () => {
    try {
      const { post }: any = await axiosAPI.post("/exec?e=LEAGUE");
      const { data } = await axiosReq.get("");
      setLeagueList(data.data);
      console.log(data.data);
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
        <ListCards key={league.id} type="League" label={league.name} sessionCount={league.count}/>
      ))}
    </div>
  ) : null;
};

export default Home;
