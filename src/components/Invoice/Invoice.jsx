import React, { useRef, useState } from "react";
import style from "./Invoice.module.css";
import html2pdf from "html2pdf.js";
import Pdf from "../Pdf/Pdf";

function Invoice() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dailyLitres, setDailyLitres] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [total, setTotal] = useState("0");
  const invoiceRef = useRef(null);
  const pdfRef = useRef(null);

  const formatDate = date => {
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let formattedDate;
    const splitedDate = String(date).split("-");
    formattedDate = `${splitedDate.at(2)} ${monthArr[Number(splitedDate.at(1) - 1)]} ${splitedDate.at(0)}`;
    return formattedDate;
  };

  const calcTotal = () => {
    const total = (dailyLitres * price * days).toLocaleString("en-IN");
    setTotal(total);
  };

  const downloadPDF = e => {
    calcTotal();
    e.preventDefault();
    const element = pdfRef.current;
    if (!element) return;

    html2pdf()
      .set({
        margin: 0,
        filename: "monthly-report.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  };

  return (
    <div ref={invoiceRef} className={style.invoice}>
      <div className={style.pdfContainer}>
        <Pdf
          ref={pdfRef}
          date={formatDate(date)}
          phone={phone}
          name={name}
          dailyLitres={dailyLitres}
          price={price}
          days={days}
          total={total}
        />
      </div>
      <div className={style.invoiceHeading}>Create Invoice</div>
      <form id='invoice' name='invoice' onSubmit={downloadPDF}>
        <div className={style.dateAndPhoneInputBox}>
          <div className={style.dateInputBox}>
            <label htmlFor='date' className={style.label}>
              Start Date
            </label>
            <input
              id='date'
              className={style.input}
              type='date'
              value={date}
              placeholder='Date'
              required
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className={style.phoneInputBox}>
            <label htmlFor='phone' className={style.label}>
              Phone Number
            </label>
            <input
              id='phone'
              className={style.input}
              type='number'
              value={phone}
              placeholder='e.g. 999999999'
              autoComplete='off'
              required
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={style.inputBox}>
          <label htmlFor='name' className={style.label}>
            Customer Name
          </label>
          <input
            id='name'
            className={style.input}
            autoComplete='off'
            type='text'
            value={name}
            required
            placeholder='e.g. Aditya Yadav'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={style.numberInputBoxes}>
          <div className={style.numberInputBox}>
            <label htmlFor='litres' name='litres' className={style.label}>
              Litres daily
            </label>
            <input
              id='litres'
              type='number'
              className={style.input}
              autoComplete='off'
              required
              placeholder='e.g. 1'
              value={dailyLitres}
              onChange={e => setDailyLitres(e.target.value)}
            />
          </div>
          <div className={style.numberInputBox}>
            <label htmlFor='price' name='litres' className={style.label}>
              Price (₹/L)
            </label>
            <input
              id='price'
              type='number'
              className={style.input}
              autoComplete='off'
              required
              placeholder='e.g. 55'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className={style.numberInputBox}>
            <label htmlFor='days' name='litres' className={style.label}>
              No. Days
            </label>
            <input
              id='days'
              type='number'
              className={style.input}
              autoComplete='off'
              required
              placeholder='e.g. 30'
              value={days}
              onChange={e => setDays(e.target.value)}
            />
          </div>
        </div>
        <div className={style.totalBox}>
          <h3>Total Amount</h3>
          <p>
            ₹<span>{total}</span>
          </p>
        </div>
        <div className={style.btns}>
          <div
            className={`${style.btn} ${style.calculateBtn}`}
            onClick={calcTotal}
          >
            Calculate
          </div>
          <button type='submit' className={`${style.btn} ${style.downloadBtn}`}>
            Download
          </button>
        </div>
      </form>
    </div>
  );
}

export default Invoice;
