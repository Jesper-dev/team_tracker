import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./teamComponent.scss";
import { Player, Team } from "./teamHelper";

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

export const TeamComponent = () => {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState(0);
  const [wins, setWins] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);

  const [team, setTeam] = useState<Team | undefined>();

  const onFormSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTeam: Team = {
      name,
      players,
      matches,
      wins,
      id: uuidv4(),
    };
    setTeam(newTeam);
    setName("");
    setMatches(0);
  };

  return (
    <div className="teamPageContainer">
      <form onSubmit={(e) => onFormSubmited(e)}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="matches">Matches</label>
        <input
          name="matches"
          value={matches}
          onChange={(e) => setMatches(Number(e.target.value))}
          type="number"
        />
        <label htmlFor="wins">Wins</label>
        <input
          name="wins"
          type="number"
          value={wins}
          onChange={(e) => setWins(Number(e.target.value))}
        />
        <div className="add-team-container">
          <button>Create Team</button>
        </div>
      </form>
      <div className="team">
        {team ? (
          <div className="team-container">
            <h1>{team.name}</h1>
            <p>
              Players:
              {team.players.map((item) => (
                <>{item}</>
              ))}
            </p>
            <p>Matches {team.matches}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
