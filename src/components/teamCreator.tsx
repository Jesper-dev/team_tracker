import "./teamCreator.scss";
import { PlayersComponent } from "./playersComponent";
import { TeamComponent } from "./teamComponent";

export const TeamCreator = () => {
  return (
    <div className="page-container">
      <TeamComponent />
      <PlayersComponent />
    </div>
  );
};
