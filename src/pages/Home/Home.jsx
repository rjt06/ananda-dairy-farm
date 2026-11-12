import { useEffect, useState } from "react";
import style from "./Home.module.css";
import app from "../../App.module.css";
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
import Deworming from "../../components/Deworming/Deworming";
import MilkCard from "../../components/MilkCard/MilkCard";
import GreetingCard from "../../components/GreetingCard/GreetingCard";

function Home({ user, dewormingList }) {
  const [type, setType] = useState("grid");

  return (
    <div className={`${style.home} ${app.animateEnter}`}>
      <GreetingCard user={user} />
      <MilkCard />
      <Quickcard type={type} />
      <Reminder />
      <Invoice />
      {/* <Deworming dewormingList={dewormingList} /> */}
      <Transactions />
    </div>
  );
}

export default Home;
