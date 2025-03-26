import React, { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import MatchItem from "../../components/MatchItem";
import FixtureItem from "../../components/FixtureItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setLeaderboard } from "../../reducers/leaderboardSlice";
import { setLoaded } from "../../reducers/sessionSlice";

const Session: React.FC = () => {
  const dispatch = useDispatch();
  const [fixtures, setFixtures] = useState([]);
  const [games, setGames] = useState<any[]>([]);
  const leaderboards = useSelector((state: RootState) => state.leaderboard.leaderboards);
  const { session, loaded } = useSelector((state: RootState) => state.session);

  const handleMount = async () => {
    try {
      await axiosAPI.post(
        `/exec?e=FIXTURES&q=${
          session.player_type + " " + session.game_type + session.player_count
        }&f=fixture_api`
      );
      var { data } = await axiosReq.get("");
      setFixtures(data.data);
      await axiosAPI.post(`/exec?e=PLAYERS&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      dispatch(setLeaderboard(data))
      await axiosAPI.post(`/exec?e=MATCH&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      data.data.map((match: any, index: number) => {
        if (index % 4 === 0) {
          const matches = data.data.filter(
            (item: any) => item.name === match.name
          );
          setGames((prevState) => [...prevState, matches]);
        }
      });
      dispatch(setLoaded(!loaded))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
    console.log(games)
  }, []);

  //   useEffect(() => {
  //     if (loaded) {
  //       const score = [...leaderboards?.data];
  //       const newgList = [...games];
  //       score.map((item) => {
  //         const count = newgList
  //           .flat()
  //           .filter(
  //             (gameF) => gameF.player === item.player && gameF.win === 1
  //           ).length;
  //         item.leaderboard = count;
  //       });
  //       setLeaderboards({ ...leaderboards, data: score });
  //     }
  //   }, [games]);

  return (
    <div>
      <div className="grid">
        <Leaderboard data={leaderboards.data} name={session.date} />

        {loaded
          ? fixtures.map((set: any, index) =>
              index === games.length % fixtures.length ? (
                <FixtureItem
                  props={set}
                  //   setGames={setGames}
                  games={games.length + 1}
                  key={set.id}
                  leaderboard={leaderboards}
                />
              ) : null
            )
          : null}
        {games.map((game, index) => (
          <MatchItem {...game} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Session;
