import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { upload } from "@imagekit/javascript";

// const animalCollection = collection(db, "users");

// UPLOAD AN IMAGE---------------------------------------------------------
export const imageUpload = async image => {
  if (!image) return;

  try {
    const response = await fetch("https://ananda-dairy-farm.onrender.com/auth");
    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const auth = await response.json();

    const result = await upload({
      file: image,
      fileName: image.name,
      publicKey: "public_6+ntLCADbIa/7dxvop1XwPkSIy4=",
      token: auth.token,
      expire: auth.expire,
      signature: auth.signature,
      useUniqueFileName: true,
    });
    // console.log("Image URL:", result.url);
    return result.url;
  } catch (error) {
    console.log("Upload failed:", error);
  }
};

// ADD COW OBJECT---------------------------------------------------------
// export const addAnimal = async (
//   { img, name, price, date, category, litres = 0, animalType, address },
//   uid,
// ) => {
//   try {
//     const cowDocRef = await addDoc(collection(db, "users", uid), {
//       img: img,
//       name: name,
//       price: price,
//       date: date,
//       category: category,
//       litres: litres,
//       animalType: animalType,
//       address: address,
//     });

//     // console.log("COW Document ID:", cowDocRef.id);
//   } catch (error) {
//     console.error("Error ->>>>", error);
//   }
// };

// export const getAnimals = async uid => {
//   try {
//     const querySnapShot = await getDocs(collection(db, "users", uid));
//     const animalList = querySnapShot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     // console.log(animalList);

//     return animalList;
//   } catch (error) {
//     console.error("ERROR fetching cows:", error);
//   }
// };
