import { User } from "../models/user";

export const UpdateUserTeamIdInStorage = (newTeamId: string) => {
  const userFromStorage = window.sessionStorage.getItem("user");
  if (userFromStorage) {
    const user = JSON.parse(userFromStorage) as User;
    const newUser = { ...user, teamId: newTeamId };
    window.sessionStorage.setItem("user", JSON.stringify(newUser));
  }
};
