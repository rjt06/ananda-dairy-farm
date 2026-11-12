import {
  getDocs,
  getDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { authReady, getCurrentUser } from "./auth";

let uid;

export const getCollection = async collectionName => {
  try {
    const currentUser = await getCurrentUser();
    uid = currentUser?.uid;

    if (!uid) {
      throw new Error("User not Authenticated");
    }

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
    throw error;
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    if (!uid) {
      throw new Error("User not Authenticated");
    }

    const data = await getDoc(doc(db, "users", uid, collectionName, docId));
    return data.data();
  } catch (error) {
    console.error("ERROR fetching animaldata:", error);
    throw error;
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
    // console.log("New Document ID:", newDocRef.id);
  } catch (error) {
    console.error("Error ->>>>", error);
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, "users", uid, collectionName, docId));
    console.log("Document deleted");
  } catch (error) {
    console.error("Error ->>>>", error);
  }
};

export const addDewormingIntoObj = async (
  collectionName,
  docId,
  newDocument,
) => {
  try {
    const newDocRef = await updateDoc(
      doc(db, "users", uid, collectionName, docId),
      // { [`deworming.deworm${newDocument.id}`]: newDocument },
      { deworming: arrayUnion(newDocument) },
    );
    // console.log("Document ID:", newDocRef.id);
  } catch (error) {
    console.error("Error ->>>>", error);
  }
};
