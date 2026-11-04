import { getDocs, getDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { authReady, getCurrentUser } from "./auth";

const currentUser = await authReady;
const uid = currentUser?.uid;

export const getCollection = async collectionName => {
  try {
    const querySnapShot = await getDocs(
      collection(db, "users", uid, collectionName),
    );
    const dataList = querySnapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return dataList;
  } catch (error) {
    console.error("ERROR fetching data:", error);
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    const data = await getDoc(doc(db, "users", uid, collectionName, docId));
    return data.data();
  } catch (error) {
    console.error("ERROR fetching animaldata:", error);
  }
};

export const addDocument = async (collectionName, newDocument) => {
  try {
    const newDocRef = await addDoc(
      collection(db, "users", uid, collectionName),
      {
        ...newDocument,
      },
    );
    console.log("New Document ID:", newDocRef.id);
  } catch (error) {
    console.error("Error ->>>>", error);
  }
};
