import React, { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import MatchItem from "../../components/MatchItem";
import FixtureItem from "../../components/FixtureItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setLeaderboard,
  updateLeaderboard,
} from "../../reducers/leaderboardSlice";
import { setFixtures, setSLoaded } from "../../reducers/sessionSlice";
import { MatchType, TableProps } from "../../typescript/Types";
import { resetGames, setGames } from "../../reducers/gamesSlice";
import { Panel } from "primereact/panel";
import FixtureListItem from "../../components/FixtureListItem";

const Session: React.FC = () => {
  const dispatch = useDispatch();
  // const [games, setGames] = useState<MatchType[][]>([]);
  const visible = useSelector((state: RootState) => state.sidebar.visible);
  const games = useSelector((state: RootState) => state.games.games);
  const leaderboards = useSelector(
    (state: RootState) => state.leaderboard.leaderboards
  );
  const { session, loaded, fixtures } = useSelector(
    (state: RootState) => state.session
  );

  const handleMount = async () => {
    dispatch(setSLoaded(false));
    dispatch(resetGames());
    try {
      await axiosAPI.post(
        `/exec?e=FIXTURES&q=${
          session.player_type + " " + session.game_type + session.player_count
        }&f=fixture_api`
      );
      var { data } = await axiosReq.get("");
      dispatch(setFixtures(data.data));
      await axiosAPI.post(`/exec?e=PLAYERS&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      dispatch(setLeaderboard(data));
      await axiosAPI.post(`/exec?e=MATCH&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      data.data.map((match: MatchType, index: number) => {
        if (index % 4 === 0) {
          const matches = data.data.filter(
            (item: MatchType) => item.name === match.name
          );
          // setGames((prevState) => [...prevState, matches]);
          dispatch(setGames(matches));
        }
      });
      dispatch(setSLoaded(true));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    if (loaded === true) {
      var score: TableProps[] = [];
      var newgList = [...games];
      leaderboards.data?.map((item) => {
        var count = newgList
          .flat()
          .filter(
            (gameF) => gameF.player === item.player && gameF.win === 1
          ).length;
        score = [...score, { ...item, leaderboard: count }];
      });
      dispatch(updateLeaderboard(score));
    }
  }, [games]);

  const headerTemplate = (options: any) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex flex-grow-1 align-items-center gap-2">
          {fixtures.map((set, index) =>
            index === games.length % fixtures.length ? (
              <FixtureItem
                props={set}
                games={games.length + 1}
                key={set.id}
                leaderboard={leaderboards}
              />
            ) : null
          )}
        </div>
        <div>{options.togglerElement}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid">
        <Leaderboard data={leaderboards.data} name={session.date} />
        <div className="col-12">
          <Panel headerTemplate={headerTemplate} toggleable>
            {fixtures.map((set, index) => (
              <FixtureListItem
                props={set}
                games={index + 1}
                key={set.id}
                leaderboard={leaderboards}
              />
            ))}
          </Panel>
        </div>
          

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
