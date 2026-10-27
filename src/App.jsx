import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./scripts/firebase";
import Splash from "./components/Splash/Splash";
import app from "./App.module.css";

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
      setUser(currentUser);

      setTimeout(() => setLoading(false), 300);
      // setLoading(false);
    });
  }, []);

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
        <Route path='/cows' element={<Cows />} />
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
