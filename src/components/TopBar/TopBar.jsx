import React from "react";
import style from "./TopBar.module.css";
import logoName from "../../assets/logoname.webp";

function TopBar() {
  return (
    <div className={style.imgDiv}>
      <img className={style.logoName} src={logoName} alt='' />
      {/* <TextAlignEnd className={style.hamburgerMenu} size={26} color='#173e26' /> */}
    </div>
  );
}

export default TopBar;
