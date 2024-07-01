import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Team } from "./components/teamHelper";

export const addTeam = async (team: Team) => {
  try {
    const docRef = await addDoc(collection(db, "teams"), {
      ...team,
    });
    console.log("Document added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document", error);
  }
};

export const fetchTeams = async () => {
  await getDocs(collection(db, "teams")).then((snapshot) => {
    const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log("DATA =>", newData);
  });
};
