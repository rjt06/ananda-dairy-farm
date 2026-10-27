import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { dateWithDay, greetingMessage } from "../../scripts/date";
import backgroundImg from "../../assets/background.webp";
import Quickcard from "../../components/Quickcard/Quickcard";
import {
  CalendarDays,
  Sun,
  Milk,
  ChevronRight,
  PawPrint,
  CalendarCheck,
  Worm,
  BriefcaseMedical,
  Wheat,
  BadgeIndianRupee,
  ReceiptText,
  ClipboardMinus,
  LayoutGridCircles,
  List,
} from "lucide-react";
import Reminder from "../../components/Reminder/Reminder";
import Transactions from "../../components/Transactions/Transactions";
import Invoice from "../../components/Invoice/Invoice";

function Home({ user }) {
  const [type, setType] = useState("grid");

  return (
    <div className={style.home}>
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
        <img
          className={style.background}
          src={backgroundImg}
          alt='background'
        />
      </div>

      <div className={style.milkCard}>
        <div className={style.milkDetails}>
          <Milk size={75} strokeWidth={3} fill='white' color='white' />
          <div className={style.milkCardText}>
            <h3>Today's Milk</h3>
            <p>102 L</p>
          </div>
        </div>
        <div className={style.rightarrowIcon}>
          <ChevronRight strokeWidth={3} color='white' />
        </div>
      </div>
      <Quickcard type={type} />
      <Reminder />
      <Invoice />
      <Transactions />
    </div>
  );
}

export default Home;
