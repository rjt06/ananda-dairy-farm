import React, { useEffect, useState } from "react";
import style from "./Animal.module.css";
import app from "../../App.module.css";
import {
  ArrowLeft,
  IndianRupee,
  MapPinHouse,
  Milk,
  PawPrint,
} from "lucide-react";
import { getDocument } from "../../firebase/firestore";

const Animal = ({ animalId, setOpenAnimal, cowList }) => {
  const [animalData, setAnimalData] = useState({});

  useEffect(() => {
    getAnimalData();
  }, []);

  const getAnimalData = () => {
    cowList.forEach(cow => {
      if (cow.id === animalId) setAnimalData(cow);
    });
  };

  return (
    <div className={`${style.animal} ${app.animateRight}`}>
      <div className={style.head}>
        <ArrowLeft onClick={() => setOpenAnimal(false)} />
        <h2 className={style.heading}>Cow Details</h2>
        <p className={style.edit}>Edit</p>
      </div>
      <div className={style.scrollable}>
        <div className={style.body}>
          <div className={`${style.image}`}>
            <img src={animalData.img} alt='cow-image' />
          </div>
          <div className={style.details}>
            <h3 className={style.name}>{animalData.name}</h3>
            <div className={style.categoryAndType}>
              <span>
                {animalData.category} • {animalData.animalType}
              </span>
              <span className={style.address}>{animalData.animalType}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animal;
