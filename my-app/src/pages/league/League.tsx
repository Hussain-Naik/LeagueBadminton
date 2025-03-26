import React, { useEffect, useState } from "react";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import ListCards from "../../components/ListCards";
import Leaderboard from "../../components/Leaderboard";
import { useNavigate } from "react-router";
import { LeaderboardType, SessionsType } from "../../typescript/Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSession } from "../../reducers/sessionSlice";
import { setLeaderboard } from "../../reducers/leaderboardSlice";

const League: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sessionItems, setSessionItems] = useState<SessionsType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const league = useSelector((state: RootState) => state.league.league);
  const leaderboards = useSelector((state: RootState) => state.leaderboard.object);

  const handleMount = async () => {
    try {
      await axiosAPI.post(
        `/exec?e=PARTICIPANTS&q=${league.id}&f=league`
      );
      var { data } = await axiosReq.get("");
      dispatch(setLeaderboard(data))
      await axiosAPI.post(`/exec?e=SESSIONS&q=${league.id}&f=league`);
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
      <Leaderboard data={leaderboards.data} name={league.name} />
      {sessionItems.map((session) => (
        <ListCards
          key={session.id}
          type={session.game_type + " " + session.player_type}
          label={session.date}
          playerCount={session.player_count}
          progress={session.progress}
          max={session.count}
          onClick={() => {
            dispatch(setSession(session));
            dispatch(setLeaderboard({}));
            navigate("/session/");
          }}
        />
      ))}
    </div>
  );
};

export default League;
