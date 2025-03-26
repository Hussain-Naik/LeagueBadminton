import React, { useState } from "react";
import Team from "./Team";
import { axiosReq } from "../api/axiosDefaults";
import { FixtureProps } from "../typescript/Types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setLoaded } from "../reducers/fixtureSlice";


const FixtureItem: React.FC<FixtureProps> = ({
  props,
  setGames,
  games,
  leaderboard,
}) => {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session.session);
  const loaded = useSelector((state: RootState) => state.loaded.loaded);
  const { data } = leaderboard;
  const {
    team1_player1_index,
    team1_player2_index,
    team2_player1_index,
    team2_player2_index,
  } = props;
  const [sheetData, setSheetData] = useState([
    {
      session: session.id,
      name: games,
      team: 1,
      player: data.filter(
        (player: any) => player.seed === team1_player1_index
      )[0].player,
      win: 0,
    },
    {
      session: session.id,
      name: games,
      team: 1,
      player: data.filter(
        (player: any) => player.seed === team1_player2_index
      )[0].player,
      win: 0,
    },
    {
      session: session.id,
      name: games,
      team: 2,
      player: data.filter(
        (player: any) => player.seed === team2_player1_index
      )[0].player,
      win: 0,
    },
    {
      session: session.id,
      name: games,
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
    dispatch(setLoaded(!loaded))
    handleSubmit()
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
      dispatch(setLoaded(true))
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
