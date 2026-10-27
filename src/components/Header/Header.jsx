import React from "react";
import logoName from "../../assets/logoname.webp";
import { BellDot, User } from "lucide-react";
import style from "./Header.module.css";

function Header({ user }) {
  return (
    <div className={style.header}>
      <img className={style.logoName} src={logoName} alt='logo' />
      <div className={style.headIcons}>
        <BellDot
          className={style.bell}
          size={26}
          strokeWidth={2}
          color='#373636'
        />
        <div className={style.userIcon}>
          <img className={style.userImg} src={user.photoURL} alt='logo' />
          {/* <User
            className={style.user}
            size={34}
            color='#16482d'
            fill='#16482d'
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
