import React from "react";
import style from "./Transactions.module.css";
import {
  ArrowLeftRight,
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronRight,
} from "lucide-react";

function Transactions() {
  return (
    <div id='transaction' className={style.transaction}>
      <div className={style.transactionHeader}>
        <div>
          <ArrowLeftRight strokeWidth={3} size={20} fill='black' />
          <p>Transactions</p>
        </div>
        <div>
          <p className={style.seeAll}>See All</p>
          <ChevronRight size={16} />
        </div>
      </div>
      <div className={style.transactionBody}>
        <div className={style.transactionList}>
          <div className={style.nameAndIcon}>
            <div className={`${style.icon} ${style.iconGreen}`}>
              <BanknoteArrowDown size={20} color='white' strokeWidth={2.5} />
            </div>
            <div className={style.nameAndDate}>
              <p className={style.name}>Aditya Thakur</p>
              <p className={style.date}>21 Oct 2026</p>
            </div>
          </div>
          <div className={`${style.amount} ${style.amountGreen}`}>₹260</div>
        </div>
        <div className={style.transactionList}>
          <div className={style.nameAndIcon}>
            <div className={`${style.icon} ${style.iconRed}`}>
              <BanknoteArrowUp size={20} color='white' strokeWidth={2.5} />
            </div>
            <div className={style.nameAndDate}>
              <p className={style.name}>Amit Kumar Singh</p>
              <p className={style.date}>21 Oct 2026</p>
            </div>
          </div>
          <div className={`${style.amount} ${style.amountRed}`}>₹340</div>
        </div>
        <div className={style.transactionList}>
          <div className={style.nameAndIcon}>
            <div className={`${style.icon} ${style.iconGreen}`}>
              <BanknoteArrowDown size={20} color='white' strokeWidth={2.5} />
            </div>
            <div className={style.nameAndDate}>
              <p className={style.name}>Aman Singh</p>
              <p className={style.date}>21 Oct 2026</p>
            </div>
          </div>
          <div className={`${style.amount} ${style.amountGreen}`}>₹2600</div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
