import React, { useState } from "react";
import Team from "./Team";
import { Badge } from 'primereact/badge';
import { TeamType } from "../typescript/Types";

const MatchItem: React.FC = (props:any) => {
  const [team, setTeam] = useState<TeamType>({
    team1: {
      team: [
        Object.values(props).filter(
          (game:any) =>
            game.team === 1
        ),
      ],
    },
    team2: {
      team: [
        Object.values(props).filter(
          (game:any) =>
            game.team === 2
        ),
      ],
    },
  });

  return (
    <div className="col-12 lg:col-6">
      <div className="flex justify-content-between align-items-center surface-0 shadow-2 p-3 border-1 border-50 border-round p-overlay-badge">
        <Team {...team.team1} />
        <span>VS</span>
        <Team {...team.team2} />
        <Badge value={'#' + props[0].name} ></Badge>
      </div>
    </div>
  );
};
export default MatchItem;
