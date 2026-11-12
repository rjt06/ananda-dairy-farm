import React from "react";
import style from "./GreetingCard.module.css";
import backgroundImg from "../../assets/background.webp";
import { CalendarDays, Sun } from "lucide-react";
import { dateWithDay, greetingMessage } from "../../scripts/date";

function GreetingCard({ user }) {
  return (
    <div className={style.greetingCard}>
      <div className={style.greeting}>
        <p className={style.goodMorning}>{greetingMessage()},</p>
        <h3 className={style.userName}>
          {user.displayName}
          <Sun size={30} strokeWidth={3} fill='#ffbf00' color='#ffbf00' />
        </h3>
        <p className={style.date}>
          <CalendarDays color='#6d6d6d' strokeWidth={3} size={18} />
          {dateWithDay()}
        </p>
      </div>
      <img className={style.background} src={backgroundImg} alt='background' />
    </div>
  );
}

export default GreetingCard;
