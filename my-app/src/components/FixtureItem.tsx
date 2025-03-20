import React, { useState } from "react";
import Team from "./Team";
import { axiosReq } from "../api/axiosDefaults";

interface FixtureProps {
  props: any;
  setGames?: () => void;
  games: any;
  setLoaded?: () => void;
  loaded: boolean;
  leaderboard: any;
}

const FixtureItem: React.FC<FixtureProps> = ({
  props,
  setGames,
  games,
  setLoaded,
  loaded,
  leaderboard,
}) => {
  const { data } = leaderboard;
  const session = {
    title: "DOUBLES ROUND ROBIN",
    count: 4,
    id: "B23",
  };
  const {
    team1_player1_index,
    team1_player2_index,
    team2_player1_index,
    team2_player2_index,
  } = props;
  const [sheetData, setSheetData] = useState([
    {
      session: session.id,
      name: games.length + 1,
      team: 1,
      player: data.filter(
        (player: any) => player.seed === team1_player1_index
      )[0].player,
      win: 0,
    },
    {
      session: session.id,
      name: games.length + 1,
      team: 1,
      player: data.filter(
        (player: any) => player.seed === team1_player2_index
      )[0].player,
      win: 0,
    },
    {
      session: session.id,
      name: games.length + 1,
      team: 2,
      player: data.filter(
        (player: any) => player.seed === team2_player1_index
      )[0].player,
      win: 0,
    },
    {
      session: session.id,
      name: games.length + 1,
      team: 2,
      player: data.filter(
        (player: any) => player.seed === team2_player2_index
      )[0].player,
      win: 0,
    },
  ]);

  const [team, setTeam] = useState({
    team1: {
      team: [
        data.filter(
          (player: any) =>
            player.seed === team1_player1_index ||
            player.seed === team1_player2_index
        ),
      ],
    },
    team2: {
      team: [
        data.filter(
          (player: any) =>
            player.seed === team2_player1_index ||
            player.seed === team2_player2_index
        ),
      ],
    },
  });

  const handleClick = (arg: number) => {
    const team1 = sheetData.filter((player) => player.team === 1);
    const team2 = sheetData.filter((player) => player.team === 2);
    if (arg === 1) {
      team1.map((player) => (player.win = 1));
      team2.map((player) => (player.win = 0));
    } else {
      team2.map((player) => (player.win = 1));
      team1.map((player) => (player.win = 0));
    }
    // setGames((prevState) => [...prevState, sheetData]);
    // setLoaded((prevState)=> !prevState)
    // handleSubmit()
  };

  const handleSubmit = async () => {
    const postMatch: any = {};
    sheetData.map((key, index) => {
      postMatch[index + 1] = {
        sheetname: "MATCH",
        ...key,
      };
    });
    const matchJSON = JSON.stringify(postMatch);
    try {
      const post = await axiosReq.post(`/exec?post=${matchJSON}`);
      //   setGames([...games, post.data.data])
      //   setLoaded((prevState:boolean)=> !prevState)
    } catch (error) {}
  };

  return (
    <div className="col-12 lg:col-6">
      <div className="flex justify-content-between align-items-center surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div
          className="flex-grow-1"
          onClick={() => {
            loaded ? handleClick(1) : console.log("disabled");
          }}
        >
          <Team {...team.team1} />
        </div>
        <span>{loaded ? "VS" : null}</span>
        <div
          className="flex-grow-1"
          onClick={() => {
            loaded ? handleClick(2) : console.log("disabled");
          }}
        >
          <Team {...team.team2} />
        </div>
      </div>
    </div>
  );
};

export default FixtureItem;
