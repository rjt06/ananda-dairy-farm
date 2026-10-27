import { useEffect, useState } from "react";
import style from "./Quickcard.module.css";
import {
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
import { Link } from "react-router-dom";

function Quickcard() {
  const [type, setType] = useState("grid");

  return (
    <>
      <div className={style.chooseGrid}>
        <h3 className={style.quickAccess}>Quick Access</h3>
        <div className={style.innerChoose}>
          <LayoutGridCircles
            color='white'
            size={20}
            onClick={() => setType("grid")}
          />
          <span></span>
          <List color='white' size={20} onClick={() => setType("list")} />
        </div>
      </div>
      <div
        className={`${style.quickList} ${type === "list" ? style.makeQuickList : style.makeQuickGrid}`}
      >
        <Link
          to='/cows'
          style={{ backgroundColor: "#0067291d" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <PawPrint strokeWidth={3} color='#006729' size={30} />
          <p>Cows</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </Link>
        <Link
          to='/'
          style={{ backgroundColor: "#c3007f18" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <CalendarCheck strokeWidth={3} color='#c3007f' size={30} />
          <p>Delivery</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </Link>
        <Link
          to='/'
          style={{ backgroundColor: "#0067291d" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <Worm strokeWidth={3} color='#7e8000' size={30} />
          <p>Deworming</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </Link>
        <Link
          to='/meds'
          style={{ backgroundColor: "#de00001e" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <BriefcaseMedical strokeWidth={3} color='#de0000' size={30} />
          <p>Medicine</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </Link>
        <Link
          to='/feed'
          style={{ backgroundColor: "#d77a001e" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <Wheat strokeWidth={3} color='#d77a00' size={30} />
          <p>Feed</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </Link>
        <a
          href='#transaction'
          style={{ backgroundColor: "#00ae261c" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <BadgeIndianRupee strokeWidth={3} color='#018c1f' size={30} />
          <p>Transactions</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </a>
        <a
          href='#invoice'
          style={{ backgroundColor: "#054caf1e" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <ReceiptText strokeWidth={3} color='#054caf' size={30} />
          <p>Invoice</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </a>
        <Link
          to='/'
          style={{ backgroundColor: "#c182031e" }}
          className={`${style.quickcard} ${type === "list" ? style.makeList : style.makeGrid}`}
        >
          <ClipboardMinus strokeWidth={3} color='#c18103' size={30} />
          <p>Reports</p>
          {type === "list" ? (
            <ChevronRight
              className={style.chevronRight}
              color='#1d1d1de7'
              size={20}
              strokeWidth={2}
            />
          ) : (
            ""
          )}
        </Link>
      </div>
    </>
  );
}

export default Quickcard;

// {type === "list" ? (
//   <ChevronRight
//     className={style.chevronRight}
//     color='#1d1d1de7'
//     size={20}
//     strokeWidth={2}
//   />
// ) : (
//   ""
// )}
