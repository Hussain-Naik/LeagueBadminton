import React, { useEffect } from "react";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import ListCards from "../../components/ListCards";
import Leaderboard from "../../components/Leaderboard";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSession, setSLoaded } from "../../reducers/sessionSlice";
import { setLeaderboard } from "../../reducers/leaderboardSlice";
import { setLoaded, setSessionItems } from "../../reducers/leagueSlice";
import { resetGames } from "../../reducers/gamesSlice";

const League: React.FC = () => {
  const { loaded, league, sessionItems } = useSelector((state: RootState) => state.league);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const leaderboards = useSelector((state: RootState) => state.leaderboard.leaderboards);

  const handleMount = async () => {
    dispatch(setSessionItems([]))
    try {
      await axiosAPI.post(
        `/exec?e=PARTICIPANTS&q=${league.id}&f=league`
      );
      var { data } = await axiosReq.get("");
      dispatch(setLeaderboard(data))
      await axiosAPI.post(`/exec?e=SESSIONS&q=${league.id}&f=league`);
      var { data } = await axiosReq.get("");
      dispatch(setSessionItems(data.data))
      dispatch(setLoaded(!loaded))
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
            dispatch(setSLoaded(false));
            dispatch(resetGames());
            navigate("/session/");
          }}
        />
      ))}
    </div>
  );
};

export default League;
