import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { LeaderboardType } from "../typescript/Types";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../reducers/sidebarVisible";
import { RootState } from "../store/store";

const Leaderboard: React.FC<LeaderboardType> = ({ data, name }) => {
  const emptyData = [{ player: "Hussain", leaderboard: 2 }];
  const [empty, setEmpty] = useState<boolean>(false);
  const visible = useSelector((state: RootState) => state.sidebar.visible);
  const dispatch = useDispatch();

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
        <div className="flex justify-content-between align-items-center flex-wrap mb-1">
          <div className="block text-500 font-medium">{name}</div>
          <Button
            icon="pi pi-bookmark"
            size="small"
            rounded
            text
            severity="secondary"
            aria-label="Bookmark"
            onClick={() => dispatch(setVisible(true))}
          />
        </div>

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
