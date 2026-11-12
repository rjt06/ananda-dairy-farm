import React from "react";
import style from "./Deworming.module.css";
import app from "../../App.module.css";
import { Worm } from "lucide-react";
import EmptyList from "../EmptyList/EmptyList";

function Deworming({ dewormingList }) {
  // setTimeout(() => {
  //   console.log(dewormingList);
  // }, 2000);

  return (
    <div className={`${style.deworming} ${app.animateEnter}`}>
      <div className={style.heading}>
        <Worm fill='true' />
        <h3 className={style.heading}>Deworming List of all Animals</h3>
      </div>
      {!dewormingList && <EmptyList messegeFor={"deworming"} />}
      <ul className={style.lists}>
        {dewormingList.map((list, index) => {
          return (
            <li className={style.list} key={index}>
              <div className={style.imgBox}>
                <img
                  className={style.cowImg}
                  src={list.at(0)}
                  alt='cow-image'
                />
                <div className={style.cowName}>{list.at(1)}</div>
              </div>
              <div className={style.innerListDiv}>
                {list.at(2).map((deworm, i) => {
                  return (
                    <ul key={i} className={style.innerListUl}>
                      <li className={style.medicine}>{deworm.medicine}</li>
                      <li className={style.date}>{deworm.date}</li>
                    </ul>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Deworming;
