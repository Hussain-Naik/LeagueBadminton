import React, { JSX, useEffect, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { useLocation, useNavigate } from "react-router";
import MyButtons from "./MyButtons";
import CreateLeague from "../pages/league/CreateLeague";
import CreateSession from "../pages/session/CreateSession";

const Footer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const buttons: JSX.Element = (
    <>
      <MyButtons
        icon="pi pi-plus text-2xl"
        onClick={() => {
          setVisible(true);
        }}
      ></MyButtons>
      {visible ? (
        <MyButtons
          icon="pi pi-cloud-download text-2xl"
          onClick={() => {
            navigate("/session/");
          }}
        ></MyButtons>
      ) : null}
    </>
  );

  const centerContent: JSX.Element = (
    <div className="flex flex-wrap align-items-center gap-3">
      <MyButtons
        icon="pi pi-home text-2xl"
        onClick={() => {
          navigate("/");
        }}
      ></MyButtons>
      {location.pathname.includes("/session/") ? null : buttons}
    </div>
  );

    const createComponents =
      location.pathname === "/" ? (
        <CreateLeague visible={visible} setVisible={() => setVisible(!visible)} />
      ) : (
        <CreateSession visible={visible} setVisible={() => setVisible(!visible)} />
      );

  return (
    <div className="card sticky bottom-0">
      <Toolbar
        center={centerContent}
        className="bg-gray-900 shadow-2 p-2 my-1 print-hidden"
        style={{
          borderRadius: "3rem",
          backgroundImage:
            "linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))",
        }}
      />
      {createComponents}
    </div>
  );
};

export default Footer;
