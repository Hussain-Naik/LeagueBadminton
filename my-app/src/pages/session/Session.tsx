import React, { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import MatchItem from "../../components/MatchItem";
import FixtureItem from "../../components/FixtureItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setLeaderboard } from "../../reducers/leaderboardSlice";
import { setFixtures, setLoaded } from "../../reducers/sessionSlice";
import { MatchType } from "../../typescript/Types";
import { setGames } from "../../reducers/gamesSlice";

const Session: React.FC = () => {
  const dispatch = useDispatch();
  // const [games, setGames] = useState<MatchType[][]>([]);
  const games = useSelector((state: RootState) => state.games.games);
  const leaderboards = useSelector((state: RootState) => state.leaderboard.leaderboards);
  const { session, loaded, fixtures } = useSelector((state: RootState) => state.session);

  const handleMount = async () => {
    try {
      await axiosAPI.post(
        `/exec?e=FIXTURES&q=${
          session.player_type + " " + session.game_type + session.player_count
        }&f=fixture_api`
      );
      var { data } = await axiosReq.get("");
      dispatch(setFixtures(data.data))
      await axiosAPI.post(`/exec?e=PLAYERS&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      dispatch(setLeaderboard(data))
      await axiosAPI.post(`/exec?e=MATCH&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      data.data.map((match: MatchType, index: number) => {
        if (index % 4 === 0) {
          const matches = data.data.filter(
            (item: MatchType) => item.name === match.name
          );
          // setGames((prevState) => [...prevState, matches]);
          dispatch(setGames(matches))
        }
      });
      dispatch(setLoaded(!loaded))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

    useEffect(() => {
      // if (loaded) {
      //   const score = [...leaderboards?.data];
      //   const newgList = [...games];
      //   score.map((item) => {
      //     const count = newgList
      //       .flat()
      //       .filter(
      //         (gameF) => gameF.player === item.player && gameF.win === 1
      //       ).length;
      //     item.leaderboard = count;
      //   });
      //   setLeaderboards({ ...leaderboards, data: score });
      // }
      console.log(games)
    }, [games]);

  return (
    <div>
      <div className="grid">
        <Leaderboard data={leaderboards.data} name={session.date} />

        {loaded
          ? fixtures.map((set, index) =>
              index === games.length % fixtures.length ? (
                <FixtureItem
                  props={set}
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
