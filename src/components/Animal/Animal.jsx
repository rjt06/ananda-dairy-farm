import React, { useEffect, useState } from "react";
import style from "./Animal.module.css";
import {
  ArrowLeft,
  IndianRupee,
  MapPinHouse,
  Milk,
  PawPrint,
} from "lucide-react";

const Animal = ({ animalId, getAnimalData, setOpenAnimal }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [litres, setLitres] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [address, setAddress] = useState("");

  getAnimalData(animalId).then(data => {
    setImageUrl(data.img);
    setName(data.name);
    setPrice(data.price);
    setDate(data.date);
    setCategory(data.category);
    setLitres(data.litres);
    setAnimalType(data.animalType);
    setAddress(data.address);
  });

  return (
    <div className={`${style.animal} ${style.animateEnter}`}>
      <div className={style.head}>
        <ArrowLeft onClick={() => setOpenAnimal(false)} />
        <h2 className={style.heading}>Cow Details</h2>
        <p className={style.edit}>Edit</p>
      </div>
      <div className={style.scrollable}>
        <div className={style.body}>
          <div className={`${style.image} ${style.animateAppear}`}>
            <img src={imageUrl} alt='cow-image' />
          </div>
          <div className={style.details}>
            <h3 className={style.name}>{name}</h3>
            <div className={style.categoryAndType}>
              <span>
                {category} • {animalType}
              </span>
              <span className={style.address}>{address}</span>
            </div>
            <div className={style.card}>
              <div className={style.grid}>
                <div className={style.iconBox}>
                  <Milk color='#2d9bb9' />
                </div>
                <div className={style.gridDetails}>
                  <h3>
                    {animalType.toLocaleLowerCase() === "cow"
                      ? "Milk Capacity"
                      : "Growing"}
                  </h3>
                  <span>
                    {animalType.toLocaleLowerCase() === "cow"
                      ? litres
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
                  <span>{category}</span>
                </div>
              </div>
              <div className={style.grid}>
                <div className={style.iconBox}>
                  <IndianRupee color='#2d9bb9' />
                </div>
                <div className={style.gridDetails}>
                  <h3>Price</h3>
                  <span>{price}₹</span>
                </div>
              </div>
              <div className={style.grid}>
                <div className={style.iconBox}>
                  <MapPinHouse color='#2d9bb9' />
                </div>
                <div className={style.gridDetails}>
                  <h3>Address</h3>
                  <span>{address}</span>
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
