import React, { useEffect, useState } from "react";
import style from "./Animal.module.css";
import app from "../../App.module.css";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  IndianRupee,
  MapPinHouse,
  Milk,
  PawPrint,
  Worm,
} from "lucide-react";
import { addDewormingIntoObj, getDocument } from "../../firebase/firestore";
import { formatDate } from "../../scripts/date";

const Animal = ({ animalId, cowList }) => {
  const [animalData, setAnimalData] = useState({});
  const [clickedDeworming, setClickedDeworming] = useState(false);
  const [date, setDate] = useState("");
  const [medicine, setMedicine] = useState("");

  useEffect(() => {
    getAnimalData();
  }, []);

  const getAnimalData = () => {
    cowList.forEach(cow => {
      if (cow.id === animalId) setAnimalData(cow);
    });
  };

  const uploadDewormingDate = () => {
    addDewormingIntoObj("cows", animalId, {
      // id: crypto.randomUUID(),
      medicine: medicine,
      date: formatDate(date),
    });
    console.log("Listed");
    setDate("");
    setMedicine("");
  };

  return (
    <div className={`${style.animal} ${app.animateDown}`}>
      <div className={style.body}>
        <div className={`${style.image}`}>
          <img src={animalData.img} alt='cow-image' />
        </div>
        <div className={style.details}>
          <div className={style.nameAndDate}>
            <h3 className={style.name}>{animalData.name}</h3>
            <h4 className={style.date}>{animalData.date}</h4>
          </div>
          <div className={style.categoryAndEdit}>
            <div className={style.categoryAndType}>
              <span>
                {animalData.category} • {animalData.animalType}
              </span>
              <span className={style.address}>{animalData.address}</span>
            </div>
            <p className={style.edit}>Edit</p>
          </div>

          <div className={style.card}>
            <div className={style.grid}>
              <div className={style.iconBox}>
                <Milk color='#2d9bb9' />
              </div>
              <div className={style.gridDetails}>
                <h3>
                  {animalData.animalType?.toLowerCase() === "cow"
                    ? "Milk Capacity"
                    : "Growing"}
                </h3>
                <span>
                  {animalData.animalType?.toLowerCase() === "cow"
                    ? `${animalData.litres} L`
                    : "No milk"}
                </span>
              </div>
            </div>
            <div className={style.grid}>
              <div className={style.iconBox}>
                <PawPrint color='#2d9bb9' />
              </div>
              <div className={style.gridDetails}>
                <h3>Category</h3>
                <span>{animalData.category}</span>
              </div>
            </div>
            <div className={style.grid}>
              <div className={style.iconBox}>
                <IndianRupee color='#2d9bb9' />
              </div>
              <div className={style.gridDetails}>
                <h3>Price</h3>
                <span>{animalData.price}₹</span>
              </div>
            </div>
            <div className={style.grid}>
              <div className={style.iconBox}>
                <MapPinHouse color='#2d9bb9' />
              </div>
              <div className={style.gridDetails}>
                <h3>Address</h3>
                <span>{animalData.address}</span>
              </div>
            </div>
          </div>
          <form
            className={style.dewormingInputBox}
            onSubmit={e => {
              e.preventDefault();
              uploadDewormingDate();
            }}
          >
            <div className={style.dewormingInputs}>
              <input
                className={style.dewormingInput}
                type='text'
                value={medicine}
                required
                placeholder='Medicine'
                autoComplete='off'
                onChange={e => setMedicine(e.target.value)}
              />
              <input
                className={style.dewormingInput}
                type='date'
                value={date}
                required
                onChange={e => setDate(e.target.value)}
              />
            </div>

            <button type='submit' className={style.saveDewormingBtn}>
              Save Date
            </button>
          </form>
          <div
            className={`${style.deworming} ${clickedDeworming ? style.dewormingBig : ""}`}
            onClick={() => {
              setClickedDeworming(!clickedDeworming);
            }}
          >
            <div
              className={` ${style.dewormingDetails} ${clickedDeworming ? style.dewormingDetailsBig : ""}`}
            >
              <div
                className={`animateEnter ${style.dewormingIconBox} ${clickedDeworming ? style.dewormingIconBoxBig : ""}`}
              >
                <Worm strokeWidth={3} color='#002980cb' size={30} />
              </div>
              {!clickedDeworming && (
                <div className={style.dewomingText}>
                  <h3 className={style.dewomingText}>Deworming</h3>
                </div>
              )}
            </div>
            {!clickedDeworming && (
              <div className={style.chevronDown}>
                <ChevronDown />
              </div>
            )}
            {clickedDeworming && (
              <>
                <h2 className={style.dewormingTextBig}>Deworming</h2>
                <ul className={style.dewormingLists}>
                  {animalData.deworming &&
                    animalData.deworming
                      .toReversed()
                      .map((deworming, index) => {
                        return (
                          <li
                            className={style.dewormingList}
                            key={animalData.deworming.length - index}
                          >
                            <span className={style.innerList}>
                              <p className={style.dewormingNumber}>
                                {animalData.deworming.length - index}.
                              </p>
                              <h3 className={style.medicineName}>
                                {deworming.medicine}
                              </h3>
                            </span>
                            <p className={style.dewormingDate}>
                              {deworming.date}
                            </p>
                          </li>
                        );
                      })}
                  {!animalData.deworming && (
                    <div>No deworming details saved yet</div>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animal;
