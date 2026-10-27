import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../scripts/firebase";
import logoName from "../../assets/logoname.webp";
import style from "./Login.module.css";
import signupSvg from "../../../public/signup.svg";
import logo from "../../assets/logo.webp";
import backgroundImg from "../../assets/background.webp";
import google from "../../assets/google.webp";
import miniBackground from "../../assets/mini-background.webp";
import {
  Carton,
  HeartPulse,
  Wheat,
  Summary,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function Login() {
  return (
    <div className={style.login}>
      <img className={style.logo} src={logo} alt='logo' />

      <div className={style.backgroundDiv}>
        <img
          className={style.backgroundImg}
          src={backgroundImg}
          alt='background'
        />
      </div>
      <div className={style.loginDiv}>
        <div className={style.innerLoginDiv}>
          <div className={style.iconDiv}>
            <div className={style.iconAndText}>
              <div className={`${style.icons} ${style.icon1}`}>
                <Carton size={28} color='#1f572b' strokeWidth={3} />
              </div>
              <p>
                Track <br /> Milk Production
              </p>
            </div>
            <div className={style.iconAndText}>
              <div className={`${style.icons} ${style.icon2}`}>
                <HeartPulse size={28} color='#c20165' strokeWidth={3} />
              </div>
              <p>
                Manage <br />
                Health Records
              </p>
            </div>
            <div className={style.iconAndText}>
              <div className={`${style.icons} ${style.icon3}`}>
                <Wheat size={26} color='#be7901' strokeWidth={3} />
              </div>
              <p>
                Monitor <br /> Feed & Expenses
              </p>
            </div>
            <div className={style.iconAndText}>
              <div className={`${style.icons} ${style.icon4}`}>
                <Summary size={28} color='#005ca8' strokeWidth={3} />
              </div>
              <p>
                View <br />
                Reports
              </p>
            </div>
          </div>
          <div className={style.line}></div>
          <div className={style.btnDiv}>
            <button
              className={style.btn}
              onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
            >
              <div className={style.googleImgDiv}>
                <img src={google} alt='google' />
              </div>
              <div className={style.btnText}>
                <span className={style.span1}>Continue as</span>
                <span className={style.span2}>Cow Owner</span>
              </div>
              <ChevronRight color='white' />
            </button>
            <div className={style.secureLogin}>
              <ShieldCheck size={16} /> Secure Login with Google
            </div>
          </div>
        </div>
        <img
          className={style.miniBackground}
          src={miniBackground}
          alt='background'
        />
      </div>
    </div>
  );
}

export default Login;
