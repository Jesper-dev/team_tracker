import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./playersComponent.scss";
import { Player, Team } from "./teamHelper";
import { updateTeamWithPlayers } from "../api/dbApi";
import { useGetUser } from "../hooks/useGetUser";

const positionList = [
  "CDM",
  "GK",
  "CF",
  "RB",
  "LB",
  "LWB",
  "RWB",
  "DM",
  "CM",
  "RM",
  "LM",
  "AM",
  "SS",
  "LW",
  "RW",
];

export const PlayersComponent = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(positionList[0]);
  const [goals, setGoals] = useState(0);
  const [attendingMatches, setAttendingMatches] = useState(0);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const user = useGetUser();

  if (!user) return "Not logged in";

  const onFormSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlayer: Player = {
      name,
      position,
      goals,
      attendingMatches,
      id: uuidv4(),
      teamId: user.teamId,
    };
    const list = playerList.concat([newPlayer]);
    setPlayerList(list);
    updateTeamWithPlayers(newPlayer, user.userId, user.teamId);
    setName("");
    setPosition(positionList[0]);
    setGoals(0);
    setAttendingMatches(0);
  };

  const removePlayer = (id: string) => {
    const newList = playerList.filter((x) => x.id !== id);
    setPlayerList(newList);
  };
  return (
    <div className="playersPageContainer">
      <form onSubmit={(e) => onFormSubmited(e)}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="name">Postion</label>
        <select
          name="postion"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          {positionList.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label htmlFor="goals">Goals</label>
        <input
          name="goals"
          type="number"
          value={goals}
          onChange={(e) => setGoals(Number(e.target.value))}
        />
        <label htmlFor="attendingMatches">Attending matches</label>
        <input
          name="attendingMatches"
          type="number"
          value={attendingMatches}
          onChange={(e) => setAttendingMatches(Number(e.target.value))}
        />
        <div className="add-player-container">
          <button>Add player</button>
        </div>
      </form>
      <div className="players">
        {playerList.map((item) => {
          return (
            <div key={item.id} className="player-container">
              <div className="player-header">
                <h1>{item.name}</h1>
                <button onClick={() => removePlayer(item.id)}>X</button>
              </div>

              <p>Position: {item.position}</p>
              <p>Goals {item.goals}</p>
              <p>Attending matches {item.attendingMatches}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
