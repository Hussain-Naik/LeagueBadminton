import React, { useEffect, useState } from "react";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import ListCards from "../../components/ListCards";
import Leaderboard from "../../components/Leaderboard";
import { useNavigate } from "react-router";

type SessionsType = {
  id: string;
  league: string;
  count: number;
  date: string;
  game_type: string;
  player_count: number;
  player_type: string;
  progress: number;
};

type TableProps = {
  id: string;
  league?: string;
  player: string;
  leaderboard: number;
}

type LeaderboardType = {
  data?: TableProps[];
}

const League: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sessionItems, setSessionItems] = useState<SessionsType[]>([]);
  const [leaderboards, setLeaderboards] = useState<LeaderboardType>({});
  const navigate = useNavigate()
  //   const league = JSON.parse(localStorage.getItem("leagueToken"));
  const league = {
    count: 22,
    id: "A2",
    name: "tryout",
  };

  const handleMount = async () => {
    try {
      await axiosAPI.post(
        `/exec?e=PARTICIPANTS&q=${league.id}&f=league`
      );
      var { data } = await axiosReq.get("");
      setLeaderboards(data);
      console.log(data)
      await axiosAPI.post(
        `/exec?e=SESSIONS&q=${league.id}&f=league`
      );
      var { data } = await axiosReq.get("");
      setSessionItems(data.data);
      setLoaded(true);
    } catch (error) {}
  };

  useEffect(() => {
    handleMount();
  }, []);
  return (
    <div className="grid">
        <Leaderboard data={leaderboards.data}/>
      {sessionItems.map((session) => (
        <ListCards
          key={session.id}
          type={session.game_type + " " + session.player_type}
          label={session.date}
          playerCount={session.player_count}
          progress={session.progress}
          max={session.count}
          onClick={() => {
            navigate("/session/");
          }}
        />
      ))}
    </div>
  );
};

export default League;
