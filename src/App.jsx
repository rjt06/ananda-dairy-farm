import { useEffect, useState } from "react";
import { connectAuthEmulator, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./scripts/firebase";
import Splash from "./components/Splash/Splash";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "./scripts/firebase.js";
import style from "./App.module.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Cows from "./pages/Cows/Cows";
import Login from "./pages/Login/Login";
import Meds from "./pages/Meds/Meds";
import Feed from "./pages/Feed/Feed";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
        console.log("UID:", currentUser.uid);
        console.log("Project ID:", db.app.options.projectId);
      } else {
        console.log("User not logged in");
      }

      setTimeout(() => setLoading(false), 300);
      // setLoading(false);
    });
  }, []);

  const getAnimals = async uid => {
    try {
      const querySnapShot = await getDocs(collection(db, "users", uid, "cows"));
      const animalList = querySnapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // console.log(animalList);

      return animalList;
    } catch (error) {
      console.error("ERROR fetching cows:", error);
    }
  };

  if (loading) return <Splash />;

  return (
    <>
      {location.pathname !== "/login" && user && <Navbar />}
      {location.pathname !== "/login" && user && <Header user={user} />}
      <Routes>
        <Route
          path='/'
          element={
            user ? <Home user={user} /> : <Navigate to='/login' replace />
          }
        />
        <Route
          path='/cows'
          element={<Cows user={user} getAnimals={getAnimals} />}
        />
        <Route
          path='/login'
          element={user ? <Navigate to='/' replace /> : <Login />}
        />
        <Route path='/meds' element={<Meds user={user} />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </>
  );
};

export default App;
