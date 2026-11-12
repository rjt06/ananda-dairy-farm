import React from "react";
import style from "./MilkCard.module.css";
import app from "../../App.module.css";
import { ChevronRight, Milk } from "lucide-react";

function MilkCard() {
  return (
    <div className={`${style.milkCard} ${app.animateEnter}`}>
      <div className={style.milkDetails}>
        <Milk size={70} fill='white' color='white' />
        <div className={style.milkCardText}>
          <h3>Today's Milk</h3>
          <p>102 L</p>
        </div>
      </div>
      <div className={style.rightarrowIcon}>
        <ChevronRight strokeWidth={3} color='white' />
      </div>
    </div>
  );
}

export default MilkCard;
