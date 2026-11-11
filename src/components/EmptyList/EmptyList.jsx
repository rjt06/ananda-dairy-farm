import React from "react";
import style from "./EmptyList.module.css";
import { SquareExclamationPoint } from "lucide-react";

function EmptyList({ messegeFor }) {
  return (
    <div className={style.emptyBox}>
      <div className={style.exclamationIconBox}>
        <SquareExclamationPoint size={50} color='red' strokeWidth={3} />
      </div>
      <h3>You haven't added any {messegeFor} yet</h3>
    </div>
  );
}

export default EmptyList;
