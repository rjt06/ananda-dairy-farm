import React from "react";
import logoImg from "../../assets/logo.webp";
import splash from "./Splash.module.css";
function Splash() {
  return (
    <div className={splash.splash}>
      <img className={splash.logoImg} src={logoImg} alt='logo' />
    </div>
  );
}

export default Splash;
