import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Player, Team } from "../components/teamHelper";

/** USER */
export const addUserToDB = async (userId: string, email: string) => {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { userId, email, teamId: "" });
    console.log("Created user with userId:", userId);
  } catch (error) {
    console.error("Error adding user", error);
  }
};

export const updateUserTeamId = async (newTeamId: string, userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { teamId: newTeamId });
    console.log("Updated document with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document", error);
  }
};

export const addTeam = async (team: Team, userId: string) => {
  try {
    const docRef = doc(db, "users", userId, "team", team.id);
    await setDoc(docRef, { ...team });

    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document", error);
  }
};

export const updateTeamWithPlayers = async (
  player: Player,
  userId: string,
  teamName: string
) => {
  try {
    const docRef = doc(
      db,
      "users",
      userId,
      "team",
      teamName,
      "players",
      player.id
    );
    await setDoc(docRef, { ...player });
    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document", error);
  }
};

export const fetchTeam = async (userId: string, teamId: string) => {
  try {
    const docRef = await getDoc(doc(db, "users", userId, "team", teamId));
    return docRef.data() as Team;
  } catch (error) {
    console.error("Error getting team", error);
  }
};
