import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import Splash from "./components/Splash/Splash";
import style from "./App.module.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Cows from "./pages/Cows/Cows";
import Login from "./pages/Login/Login";
import Meds from "./pages/Meds/Meds";
import Feed from "./pages/Feed/Feed";
import { getCurrentUser, subscribeToAuth } from "./firebase/auth";
import { getCollection } from "./firebase/firestore";

const App = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [cowList, setCowList] = useState([]);
  const [medList, setMedList] = useState([]);
  const [feedList, setFeedList] = useState([]);
  const [totalAnimalsCountArr, setTotalAnimalsCountArr] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(currentUser => {
      if (currentUser) {
        // setTimeout(() => setLoading(false), 300);
        setUser(currentUser);
        // console.log("UID:", currentUser.uid);
        // console.log("Project ID:", db.app.options.projectId);
      } else {
        console.log("User not logged in");
      }
    });
    // return unsubscribe;
    getCowList();
    getMedList();
    getFeedList();
  }, []);

  useEffect(() => {
    animalCount(cowList);
  }, [cowList]);

  const animalCount = cowList => {
    setTotalAnimalsCountArr[0] = cowList.length;
    let cowCount = 0;
    let calfCount = 0;
    cowList.forEach(animal => {
      if (animal.animalType.toLowerCase() === "cow") cowCount++;
      if (animal.animalType.toLowerCase() === "calf") calfCount++;
    });
    setTotalAnimalsCountArr[1] = cowCount;
    setTotalAnimalsCountArr[2] = calfCount;
    setTotalAnimalsCountArr([cowList.length, cowCount, calfCount]);
  };

  const getCowList = async () => {
    try {
      const list = await getCollection("cows");
      setCowList(list);
      setTimeout(() => setLoading(false), 300);
    } catch (error) {
      console.error(error);
    }
  };

  const getMedList = async () => {
    try {
      const list = await getCollection("meds");
      setMedList(list);
    } catch (error) {
      console.error(error);
    }
  };

  const getFeedList = async () => {
    try {
      const list = await getCollection("feed");
      setFeedList(list);
    } catch (error) {
      console.error(error);
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
          element={
            <Cows
              cowList={cowList}
              setCowList={setCowList}
              totalAnimalsCountArr={totalAnimalsCountArr}
            />
          }
        />
        <Route
          path='/login'
          element={user ? <Navigate to='/' replace /> : <Login />}
        />
        <Route
          path='/meds'
          element={<Meds medList={medList} setMedList={setMedList} />}
        />
        <Route
          path='/feed'
          element={<Feed feedList={feedList} setFeedList={setFeedList} />}
        />
      </Routes>
    </>
  );
};

export default App;
