import { User } from "../models/user";

export const useGetUser = (): User | undefined => {
  const user = window.sessionStorage.getItem("user");
  if (user) return JSON.parse(user);
  return undefined;
};
