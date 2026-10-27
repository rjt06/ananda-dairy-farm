import { BellRing, ChevronRight } from "lucide-react";
import React from "react";
import style from "./Reminder.module.css";

function Reminder() {
  return (
    <div id='invoice' className={style.reminder}>
      <div className={style.reminderHeader}>
        <div>
          <BellRing strokeWidth={3} size={20} fill='black' />
          <p>Upcoming Reminders</p>
        </div>
        <div>
          <p className={style.seeAll}>See All</p>
          <ChevronRight size={16} />
        </div>
      </div>
      <div className={style.upcoming}>In progress.....</div>
    </div>
  );
}

export default Reminder;
