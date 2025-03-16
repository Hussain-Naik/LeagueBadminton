import React from "react";
import { ProgressBar } from "primereact/progressbar";

type CardListProp = {
  label: string;
  type: string;
  sessionCount?: number;
  playerCount?: number;
  progress?: number;
  max?: number;
  onClick?: () => void;
};

const ListCards: React.FC<CardListProp> = ({
  label,
  type,
  sessionCount,
  playerCount,
  progress,
  max = 0,
  onClick,
}) => {
  const valueTemplate = () => {
    return (
      <React.Fragment>
        {progress}/<b>{max}</b>
      </React.Fragment>
    );
  };

  return (
    <div className="col-12 lg:col-6" onClick={onClick}>
      <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div className="flex justify-content-between mb-2">
          <div>
            <span className="block text-500 font-medium mb-2">{type}</span>
            <div className="text-900 font-medium text-xl">{label}</div>
          </div>
          <div
            className="flex align-items-center justify-content-center bg-blue-100 border-round"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            {type === "League" ? (
              <i className="pi pi-trophy text-blue-500 text-xl"></i>
            ) : (
              <i className="pi pi-calendar text-blue-500 text-xl"></i>
            )}
          </div>
        </div>
        {type === "League" ? (
          <>
            <span className="text-green-500 font-medium">{sessionCount} </span>
            <span className="text-500">Sessions</span>
          </>
        ) : (
          <>
            <span className="text-green-500 font-medium">{playerCount} </span>
            <span className="text-500">Players</span>
          </>
        )}
        {progress &&
          (progress > max ? (
            <ProgressBar className="mt-2" value={100}></ProgressBar>
          ) : (
            <ProgressBar
              className="mt-2"
              value={(progress / max) * 100}
              displayValueTemplate={valueTemplate}
            ></ProgressBar>
          ))}
      </div>
    </div>
  );
};

export default ListCards;
