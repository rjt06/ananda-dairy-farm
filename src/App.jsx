import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Splash from "./components/Splash/Splash";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import app from "./App.module.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setTimeout(() => setLoading(false), 500);
    });
  }, []);

  if (loading) return <Splash />;
  return user ? <Home user={user} /> : <Login />;
};

export default App;
