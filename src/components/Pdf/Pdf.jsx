import React from "react";
import bottomImg from "../../assets/bottom-img.webp";
import logoName from "../../assets/logoName.webp";
import signature from "../../assets/signature.webp";
import { CalendarRange, UserRound } from "lucide-react";
import style from "./Pdf.module.css";

function Pdf({ ref, date, name, phone, dailyLitres, price, days, total }) {
  return (
    <div className={style.pdf} ref={ref}>
      <div className={style.main}>
        <div className={style.topHeading}>
          <div className={style.logoNameBox}>
            <img className={style.logoName} src={logoName} alt='logo' />
          </div>

          <div className={style.milkDeliveryBox}>
            <span className={style.milkDeliveryText}>MILK DELIVERY</span>
            <span className={style.invoiceText}>INVOICE</span>
            <span className={style.invoiceNumber}>
              Invoice No.: INV-<span>3238DI-3232</span>
            </span>
          </div>
        </div>
        <div className={style.dateBoxes}>
          <div className={style.dateBox}>
            <div className={style.calendarIcon}>
              <CalendarRange size={20} />
            </div>
            <div className={style.dateSpans}>
              <span>Invoice Date</span>
              <h3 className={style.date}>22 October 2026</h3>
            </div>
          </div>
          <div className={style.verticalLine}></div>
          <div className={style.dateBox}>
            <div className={style.calendarIcon}>
              <CalendarRange size={20} />
            </div>
            <div className={style.dateSpans}>
              <span>Start Date</span>
              <h3 className={style.date}>{date}</h3>
            </div>
          </div>
        </div>
        <div className={style.userDetails}>
          <div className={style.userDetailsHeader}>
            <div className={style.userRound}>
              <UserRound size={20} color='white' />
            </div>
            <h3 className={style.billTo}>BILL TO</h3>
          </div>
          <div className={style.userNameAndPhone}>
            <div className={style.userNameBox}>
              <span>Customer Name</span>
              <h2>{name}</h2>
            </div>
            <div className={style.userPhoneBox}>
              <span>Phone Number</span>
              <h2>{phone}</h2>
            </div>
          </div>
        </div>
        <div className={style.quantityBox}>
          <div className={style.items}>
            <h3 className={style.itemType}>DESCRIPTION</h3>
            <p className={style.itemQuantity}>Fresh Milk</p>
          </div>
          <div className={style.items}>
            <h3 className={style.itemType}>RATE</h3>
            <p className={style.itemQuantity}>₹{price} / L</p>
          </div>
          <div className={style.items}>
            <h3 className={style.itemType}>QUANTITY</h3>
            <p className={style.itemQuantity}>{dailyLitres} L/ day</p>
          </div>
          <div className={style.items}>
            <h3 className={style.itemType}>DAYS</h3>
            <p className={style.itemQuantity}>{days} days</p>
          </div>
          <div className={style.items}>
            <h3 className={style.itemType}>AMOUNT</h3>
            <p className={style.itemQuantity}>₹{total}</p>
          </div>
        </div>
        <div className={style.totalAmountBox}>
          <h3 className={style.totalAmountText}>TOTAL AMOUNT</h3>
          <h2 className={style.totalAmount}>₹{total}</h2>
        </div>
        <div className={style.thankingBox}>
          <div className={style.thankingText}>
            Thank you for choosing <br /> <span>Ananda Dairy Farm.</span>
          </div>
          <div className={style.signatureBox}>
            <img
              className={style.signatureImg}
              src={signature}
              alt='signature'
            />
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
      <div className={style.bottomImg}>
        <img className={style.bottomImg} src={bottomImg} alt='background' />
      </div>
    </div>
  );
}

export default Pdf;
