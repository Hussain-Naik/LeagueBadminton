import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { ListBox } from "primereact/listbox";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import { ToggleButton } from "primereact/togglebutton";
import { FloatLabel } from "primereact/floatlabel";
import { axiosAPI, axiosReq } from "../../api/axiosDefaults";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSession } from "../../reducers/sessionSlice";

const SessionSetting = () => {
  const dispatch = useDispatch();
  const { league } = useSelector((state: RootState) => state.league);
  const [players, setPlayers] = useState([]);
  const [value, setValue] = useState<any>([]);
  const [minReq, setMinReq] = useState(4);
  const [playerTypeChecked, setPlayerTypeChecked] = useState(false);
  const [gameTypeChecked, setGameTypeChecked] = useState(false);
  const [date, setDate] = useState<Date>(
    new Date(useSelector((state: RootState) => state.session.date))
  );
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [seed, setSeed] = useState<any>({});
  const [ready, setReady] = useState<boolean>(false);
  const [reqMet, setReqMet] = useState<boolean>(
    selectedPlayers.length >= minReq
  );
  const emptyList = [{ name: "No Players Selected", code: "NY" }];
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  const ptValue: any = {
    headerCheckbox: {
      className: "hidden",
    },
  };

  const itemTemplate = (option: any) => {
    return (
      <div className="flex justify-content-between align-items-center">
        <div className="flex justify-content-between align-items-center gap-3">
          <div onClick={() => updateSeed(option)}>
            {seed[option.player] === undefined ? 0 : seed[option.player]}
          </div>
          <div>{option.player}</div>
        </div>
        <div>
          <i
            className="pi pi-user-minus"
            onClick={() => updatePlayerList(option)}
          ></i>
        </div>
      </div>
    );
  };

  const addNewPlayer = (e: any) => {
    setSelectedPlayers([
      ...selectedPlayers,
      { id: null, league: league.id, player: e.value },
    ]);
    setSeed({ ...seed, [e.value]: selectedPlayers.length + 1 });
  };

  const addPlayer = (e: any) => {
    if (e.value[selectedPlayers.length] === undefined) {
      const removed = selectedPlayers.filter(
        (person) => !e.value.includes(person) && person.id !== null
      );
      removed.map((person) => {
        setSelectedPlayers((prevState) => {
          return prevState.filter((item) => item !== person);
        });
        setSeed((prevState: any) => {
          const key = person.player;
          const { [key]: removeKey, ...newItems } = prevState;
          return newItems;
        });
      });
    } else {
      const keys = Object.keys(seed);
      const added = e.value.filter(
        (person: any) => !keys.includes(person.player)
      );
      added.map((person: any, index: number) => {
        setSeed((prevState: any) => {
          return {
            ...prevState,
            [person.player]: index + selectedPlayers.length + 1,
          };
        });
        setSelectedPlayers((prevState) => {
          return [...prevState, person];
        });
      });
    }
  };

  const updateSeed = (option: any) => {
    if (seed[option.player] + 1 > selectedPlayers.length) {
      setSeed({ ...seed, [option.player]: 1 });
    } else {
      setSeed({ ...seed, [option.player]: seed[option.player] + 1 });
    }
  };

  const updatePlayerList = (option: any) => {
    const updatedList = selectedPlayers.filter(
      (person) => person.player !== option.player
    );
    setSelectedPlayers(updatedList);
    const newPeople = updatedList.filter((person) => person.id === null);
    const chipArray = newPeople.map((item) => item.player);
    setValue(chipArray);
    const key = option.player;
    setSeed((prevState: any) => {
      const { [key]: removeKey, ...newItems } = prevState;
      return newItems;
    });
  };

  const removeNewPlayer = (e: any) => {
    const newPeople = selectedPlayers.filter(
      (person) => person.player !== e.value
    );
    setSelectedPlayers(newPeople);
    const key = e.value;
    setSeed((prevState: any) => {
      const { [key]: removeKey, ...newItems } = prevState;
      return newItems;
    });
  };

  const autoSeed = () => {
    const keys = Object.keys(seed);
    keys.map((key, index) =>
      setSeed((prevState: any) => {
        return { ...prevState, [key]: index + 1 };
      })
    );
  };

  const handleSubmit = async () => {
    const gType = gameTypeChecked ? "TOURNAMENT" : "ROUND ROBIN";
    const pType = playerTypeChecked ? "SINGLES" : "DOUBLES";
    const postObject = {
      1: {
        sheetname: "SESSIONS",
        date: `${date.toLocaleDateString()} ${date
          .toLocaleTimeString()
          .slice(0, 5)}:00`,
        league: league.id,
        player_type: pType,
        game_type: gType,
      },
    };
    const sessionJSON = JSON.stringify(postObject);
    try {
      const keys = Object.keys(seed);
      const values = Object.values(seed);
      const post = await axiosReq.post(`/exec?post=${sessionJSON}`);
      dispatch(
        setSession({ ...post.data.data[0], player_count: values.length })
      );
      const { id } = post.data.data[0];
      const postPlayers: any = {};
      keys.map((key, index) => {
        postPlayers[index + 1] = {
          sheetname: "PLAYERS",
          player: key,
          seed: values[index],
          session: id,
        };
      });
      const playerJSON = JSON.stringify(postPlayers);
      const postPlayer = await axiosReq.post(`/exec?post=${playerJSON}`);
      const postParticipants: any = {};
      if (value.length > 0) {
        value.map((item: any, index: number) => {
          postParticipants[index + 1] = {
            sheetname: "PARTICIPANTS",
            player: item,
            league: league.id,
          };
        });
        const participantsJSON = JSON.stringify(postParticipants);
        console.log(participantsJSON);
        const postParticipant = await axiosReq.post(
          `/exec?post=${participantsJSON}`
        );
      }
      navigate("/session/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMount = async () => {
    try {
      await axiosAPI.post(`/exec?e=PARTICIPANTS&q=${league.id}&f=league`);
      const { data } = await axiosReq.get("");
      setPlayers(data.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    setReqMet(selectedPlayers.length >= minReq);
    setReady(false);
  }, [selectedPlayers]);

  useEffect(() => {
    const seedArray = Object.values(seed);
    if (new Set(seedArray).size !== seedArray.length) {
      setReady(false);
    } else {
      if (seedArray.includes(0)) {
        setReady(false);
      } else {
        setReady(true);
      }
    }
  }, [seed]);

  useEffect(() => {
    if (gameTypeChecked) {
      if (playerTypeChecked) {
        setMinReq(8);
      } else {
        setMinReq(16);
      }
    } else {
      if (playerTypeChecked) {
        setMinReq(2);
      } else {
        setMinReq(4);
      }
    }
  }, [gameTypeChecked, playerTypeChecked]);

  return (
    <div className="flex-auto">
      <label htmlFor="calendar" className="font-bold block mb-2">
        Session Date/Time
      </label>

      <Calendar
        id="calendar"
        value={date}
        onChange={(e: any) => setDate(e.value)}
        dateFormat="dd/mm/yy"
        showIcon
        showTime
        hourFormat="24"
        locale="en"
        icon={() => <i className="pi pi-pencil" />}
        pt={{ panel: { className: "w-12" } }}
        className="w-12 mb-2"
      />
      <ToggleButton
        onLabel="Singles"
        offLabel="Doubles"
        onIcon="pi pi-user"
        offIcon="pi pi-users"
        checked={playerTypeChecked}
        onChange={(e) => setPlayerTypeChecked(e.value)}
        className="w-6"
      />
      <ToggleButton
        onLabel="Tournament"
        offLabel="Round Robin"
        onIcon="pi pi-trophy"
        offIcon="pi pi-bars"
        checked={gameTypeChecked}
        onChange={(e) => setGameTypeChecked(e.value)}
        className="w-6"
      />
      {loaded ? (
        players.length > 0 ? (
          <FloatLabel className="mt-4 w-full">
            <MultiSelect
              id="ms-players"
              value={selectedPlayers}
              onChange={(e) => addPlayer(e)}
              options={players}
              optionLabel="player"
              maxSelectedLabels={3}
              className="w-full"
              pt={ptValue}
            />
            <label htmlFor="ms-players">Existing Players</label>
          </FloatLabel>
        ) : null
      ) : (
        <MultiSelect
          loading
          placeholder="Retreiving Player List..."
          className="mt-4 w-full"
        />
      )}
      <FloatLabel className="mt-4 w-full">
        <Chips
          id="new-players"
          value={value}
          onChange={(e) => setValue(e.value)}
          onAdd={(e) => addNewPlayer(e)}
          onRemove={(e) => removeNewPlayer(e)}
          className="w-full"
          pt={{ container: { className: "w-full" } }}
        />
        <label htmlFor="new-players">Enter New Players</label>
      </FloatLabel>
      {selectedPlayers.length > 0 ? (
        <ListBox
          multiple
          value={selectedPlayers}
          onChange={() => null}
          options={selectedPlayers}
          optionLabel="player"
          itemTemplate={itemTemplate}
          className="w-full mt-2"
          pt={{ list: { className: "p-0" } }}
        />
      ) : (
        <ListBox
          disabled
          options={emptyList}
          optionLabel="name"
          className="w-full mt-2"
          pt={{ list: { className: "p-0" } }}
        />
      )}
      <div className="mt-2 w-12 flex flex-column justify-content-center">
        {selectedPlayers.length > 0 ? (
          <Button
            label="Assign Player Numbers"
            severity="secondary"
            text
            raised
            className="hover:bg-gray-600"
            onClick={autoSeed}
          />
        ) : null}

        {reqMet && ready ? (
          <Button
            label="Start Session"
            severity="secondary"
            text
            raised
            className="hover:bg-gray-600"
            onClick={() => handleSubmit()}
          />
        ) : (
          <Button
            label={`${selectedPlayers.length} / ${minReq}`}
            severity="secondary"
            disabled
            text
            raised
            className="hover:bg-gray-600"
          />
        )}
      </div>
    </div>
  );
};

export default SessionSetting;
