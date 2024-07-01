export type Player = {
  name: string;
  position: string;
  goals: number;
  attendingMatches: number;
  id: string;
  teamId: string;
};

export type Team = {
  name: string;
  matches: number;
  players: Player[];
  wins: number;
  id: string;
};
