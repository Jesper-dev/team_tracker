import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./teamComponent.scss";
import { Player, Team } from "./teamHelper";
import { addTeam, fetchTeam, updateUserTeamId } from "../api/dbApi";
import { PlayersComponent } from "./playersComponent";
import { useGetUser } from "../hooks/useGetUser";
import { UpdateUserTeamIdInStorage } from "../helpers/teamHelpers";

export const TeamComponent = () => {
  const [name, setName] = useState("");
  const [matches, setMatches] = useState(0);
  const [wins, setWins] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<Team | undefined>();
  const user = useGetUser();

  const onFormSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
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
    addTeam(newTeam, user.userId);
    updateUserTeamId(newTeam.id, user.userId);
    UpdateUserTeamIdInStorage(newTeam.id);
  };

  useEffect(() => {
    if (!user) return;
    fetchTeam(user.userId, user.teamId)
      .then((value) => {
        setTeam(value);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="teamPageContainer">
      <div className="teamContainer">
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
      {team && <PlayersComponent />}
    </div>
  );
};
