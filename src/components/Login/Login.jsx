import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import logoName from "../../assets/logoname.webp";
import login from "./Login.module.css";
import signupSvg from "../../../public/signup.svg";

function Login() {
  return (
    <div className={login.login}>
      <div className={login.imgDiv}>
        <img className={login.logoName} src={logoName} alt='' />
      </div>
      <div className={login.btnBox}>
        <img className={login.signupSvg} src={signupSvg} alt='' />
        <button
          onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
          className={login.signupBtn}
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
