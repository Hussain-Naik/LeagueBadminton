import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

interface TableProps {
    id: string;
    league: string;
    player: string;
    leaderboard: number;
}

const Leaderboard: React.FC<TableProps[]> = (props) => {
  const emptyData = [{ player: "Hussain", leaderboard: 2 }];
  const { data } : any = props;
  const [empty, setEmpty] = useState<boolean>(false);
  const leagueContext = {
    count: 22,
    id: "A2",
    name: "tryout",
  };

  useEffect(() => {
    if (data === undefined) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [data]);

  return (
    <div className="col-12 lg:col-6">
      <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <span className="block text-500 font-medium mb-3">
          {leagueContext?.name}
        </span>
        {empty ? (
          <DataTable value={data} stripedRows showGridlines size="small">
            <Column field="player" header="Player"></Column>
            <Column field="leaderboard" header="Wins"></Column>
          </DataTable>
        ) : (
          <DataTable value={emptyData} stripedRows showGridlines size="small">
            <Column field="player" header="Player" body={<Skeleton />}></Column>
            <Column
              field="leaderboard"
              header="Wins"
              body={<Skeleton />}
            ></Column>
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
