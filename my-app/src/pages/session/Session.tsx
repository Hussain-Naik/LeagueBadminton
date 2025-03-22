import React, { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import MatchItem from "../../components/MatchItem";
import FixtureItem from "../../components/FixtureItem";
import { LeaderboardType } from "../../typescript/Types";


const Session: React.FC = () => {
  const session = {
    title: "DOUBLES ROUND ROBIN",
    count: 4,
    id: "B23",
  };
  const [fixtures, setFixtures] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [games, setGames] = useState<any[]>([]);
  const [leaderboards, setLeaderboards] = useState<LeaderboardType>({});

  const handleMount = async () => {
    try {
      await axiosAPI.post(
        `/exec?e=FIXTURES&q=${session.title}${session.count}&f=fixture_api`
      );
      var { data } = await axiosReq.get("");
      setFixtures(data.data);
      console.log(data.data);
      await axiosAPI.post(`/exec?e=PLAYERS&q=${session.id}&f=session`);
      var { data } = await axiosReq.get("");
      setLeaderboards(data)
      console.log(data)
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
      console.log(data.data);
      setLoaded(true);
      setReady(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
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
        <Leaderboard data={leaderboards.data} />

        {ready
          ? fixtures.map((set: any, index) =>
              index === games.length % fixtures.length ? (
                <FixtureItem
                  props={set}
                //   setGames={setGames}
                  loaded={loaded}
                //   setLoaded={setLoaded}
                  games={games}
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
