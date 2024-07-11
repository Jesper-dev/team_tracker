import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addUserToDB } from "./dbApi";
import { auth } from "../firebase";
import { User } from "../models/user";

export const signUpWithEmail = async (
  e: React.FormEvent,
  email: string,
  password: string,
  resetValues: () => void
) => {
  e.preventDefault();
  if (!email || !password) {
    console.error("Provide Email and Password");
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    addUserToDB(user.uid, user.email ?? "");
    window.sessionStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
        userId: user.uid,
        teamId: "",
      } as User)
    );
    resetValues();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error("errorCode:", errorCode, "errorMessage:", errorMessage);
  }
};

export const signInWithEmail = async (
  e: React.FormEvent,
  email: string,
  password: string,
  resetValues: () => void,
  navigateFunction: () => void
) => {
  e.preventDefault();
  if (!email || !password) {
    console.error("Provide Email and Password");
    return;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    window.sessionStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
        userId: user.uid,
        teamId: "",
      } as User)
    );
    resetValues();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.error("errorCode:", errorCode, "errorMessage:", errorMessage);
  } finally {
    navigateFunction();
  }
};
