import React, { useEffect, useRef, useState } from "react";
import style from "./Cows.module.css";
import { db } from "../../scripts/firebase.js";
import { Camera, ChevronRight, ListFilter, Plus, Search } from "lucide-react";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { imageUpload } from "../../scripts/crud.js";
import Animal from "../../components/Animal/Animal";

function Cows({ user, getAnimals }) {
  const [search, setSearch] = useState("");
  const [openAddAnimal, setOpenAddAnimal] = useState(false);
  const [openAnimal, setOpenAnimal] = useState(false);
  const [animalImage, setAnimalImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [litres, setLitres] = useState("");
  const [address, setAddress] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [animalList, setAnimalList] = useState([]);
  const [tempAnimalList, setTempAnimalList] = useState([]);
  const [totalAnimalsCount, setTotalAnimalsCount] = useState();
  const [totalCowCount, setTotalCowCount] = useState(0);
  const [totalCalfCount, setTotalCalfCount] = useState(0);
  const [herd, setHerd] = useState("all");
  const addCowRef = useRef(null);
  const cowTypeRef = useRef(null);
  const calfTypeRef = useRef(null);

  useEffect(() => {
    getListfromCloud();
    // console.log(user.uid);
  }, []);

  useEffect(() => {
    animalCount(animalList);
  }, [animalList]);

  useEffect(() => {
    sortList(animalList);
  }, [herd]);

  const addAnimal = async (
    { img, name, price, date, category, litres = 0, animalType, address },
    uid,
  ) => {
    try {
      const cowDocRef = await addDoc(collection(db, "users", uid, "cows"), {
        img: img,
        name: name,
        price: price,
        date: date,
        category: category,
        litres: litres,
        animalType: animalType,
        address: address,
      });

      // console.log("COW Document ID:", cowDocRef.id);
    } catch (error) {
      console.error("Error ->>>>", error);
    }
  };

  const sortList = animalList => {
    let sortedList;
    if (herd === "all") {
      sortedList = animalList.filter(animal => true);
    } else if (herd === "cow") {
      sortedList = animalList.filter(animal => animal.animalType === "cow");
    } else if (herd === "calf") {
      sortedList = animalList.filter(animal => animal.animalType === "calf");
    }
    setTempAnimalList(sortedList);
  };

  const getListfromCloud = async () => {
    const animalList = await getAnimals(user.uid);
    setAnimalList(animalList);
    setTempAnimalList(animalList);
    // console.log(animalList);
  };

  const getAnimalData = async animalId => {
    try {
      const animalData = await getDoc(
        doc(db, "users", user.uid, "cows", animalId),
      );

      // console.log(animalList);
      return animalData.data();
    } catch (error) {
      console.error("ERROR fetching animaldata:", error);
    }
  };

  const animalCount = animalList => {
    setTotalAnimalsCount(animalList.length);
    let cowCount = 0;
    let calfCount = 0;
    animalList.forEach(animal => {
      if (animal.animalType == "cow") cowCount++;
      if (animal.animalType == "calf") calfCount++;
    });
    setTotalCowCount(cowCount);
    setTotalCalfCount(calfCount);
  };

  const openAddCowBox = () => {
    if (openAddAnimal) {
      setOpenAddAnimal(false);
      setTimeout(() => {
        addCowRef.current.style.opacity = 0;
      }, 10);
    } else {
      setOpenAddAnimal(true);
      setAnimalImage(null);
      setTimeout(() => {
        addCowRef.current.style.opacity = 1;
      }, 200);
    }
  };

  const submitForm = async e => {
    console.log("Form submitted");
    e.preventDefault();
    setOpenAddAnimal(false);
    const imageUrl = await imageUpload(animalImage);
    if (!imageUrl) {
      throw new Error("Image upload failed");
    }
    // console.log("UPLOADED Image", uploadedImg);
    addAnimal(
      {
        img: imageUrl,
        name: name,
        price: price,
        date: date,
        category: category,
        litres: litres,
        animalType: animalType,
        address: address,
      },
      user.uid,
    );
    setAnimalImage(null);
    setName("");
    setPrice("");
    setDate("");
    setCategory("");
    setLitres("");
    setAddress("");
    console.log("Animal Listed");
    getListfromCloud();
  };

  return (
    <div className={style.cows}>
      {openAnimal ? (
        <Animal
          animalId={animalId}
          getAnimalData={getAnimalData}
          setOpenAnimal={setOpenAnimal}
        />
      ) : (
        ""
      )}
      <h2 className={style.herd}>
        Your Herd <span>(3)</span>
      </h2>
      <div
        className={`${openAddAnimal ? style.plusIconBoxBig : style.plusIconBox}`}
      >
        <Plus
          className={`${openAddAnimal ? style.plusIconBig : style.plusIcon}`}
          onClick={openAddCowBox}
          color={openAddAnimal == true ? "#4c4b4b" : "white"}
          size={35}
        />
        <div
          ref={addCowRef}
          className={`${openAddAnimal ? style.addCowBox : style.addCowBoxHidden}`}
        >
          <h3 className={style.addCowHeading}>Add Cow</h3>
          <input
            className={style.imgInput}
            type='file'
            autoComplete='new-password'
            onChange={e => setAnimalImage(e.target.files?.[0] || null)}
            id='cow-img'
            accept='image/*'
            required
          />
          <div className={style.addPhotoBox}>
            <label htmlFor='cow-img' className={style.cameraIcon}>
              <Camera size={40} fill='grey' color='rgb(202, 205, 253)' />
            </label>
            <p
              className={`${style.addPhotoText} ${animalImage ? style.done : style.addPhoto}`}
            >
              {animalImage ? "Attached ✔" : "Add Photo"}
            </p>
          </div>
          <form
            id='submitForm'
            name='submitForm'
            autoComplete='off'
            onSubmit={submitForm}
            className={style.form}
          >
            <div className={style.nameAndPrice}>
              <div className={style.flexColumn}>
                <label htmlFor='name' className={style.label}>
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  autoComplete='off'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={style.input}
                  placeholder='e.g. Gauri'
                  required
                />
              </div>
              <div className={style.flexColumn}>
                <label htmlFor='price' className={style.label}>
                  Price (₹)
                </label>
                <input
                  id='price'
                  type='number'
                  autoComplete='off'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className={style.input}
                  placeholder='e.g. 65000'
                  required
                />
              </div>
            </div>
            <div className={style.flexColumn}>
              <label htmlFor='name' className={style.label}>
                Date
              </label>
              <input
                id='date'
                type='date'
                autoComplete='off'
                value={date}
                onChange={e => setDate(e.target.value)}
                className={style.input}
                required
              />
            </div>
            <div className={style.categoryAndCapacity}>
              <div className={style.flexColumn}>
                <label htmlFor='category' className={style.label}>
                  Category
                </label>
                <input
                  id='category'
                  type='text'
                  autoComplete='off'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className={style.input}
                  placeholder='e.g. HF'
                  required
                />
              </div>
              <div className={style.flexColumn}>
                <label htmlFor='litres' className={style.label}>
                  Litres / day (Optional)
                </label>
                <input
                  id='litres'
                  type='number'
                  autoComplete='off'
                  value={litres}
                  onChange={e => setLitres(e.target.value)}
                  className={style.input}
                  placeholder='e.g. 12'
                />
              </div>
            </div>
            <div className={style.flexColumn}>
              <label htmlFor='address' className={style.label}>
                Address / Location
              </label>
              <input
                id='address'
                type='text'
                autoComplete='off'
                value={address}
                onChange={e => setAddress(e.target.value)}
                className={style.input}
                required
                placeholder='e.g. Asana Bodarwar Kushinagar'
              />
            </div>
            <div className={style.btns}>
              <div className={style.chooseType}>
                <span
                  ref={calfTypeRef}
                  className={style.calfType}
                  onClick={e => {
                    setAnimalType("Calf");
                    e.target.classList.add(style.active);
                    cowTypeRef.current.classList.remove(style.active);
                  }}
                >
                  Calf
                </span>
                <span
                  ref={cowTypeRef}
                  className={`${style.cowType}`}
                  onClick={e => {
                    setAnimalType("Cow");
                    e.target.classList.add(style.active);
                    calfTypeRef.current.classList.remove(style.active);
                  }}
                >
                  Cow
                </span>
              </div>
              <button className={`${style.btn} ${style.cowBtn}`} type='submit'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={style.herdUlBox}>
        <ul className={style.herdUl}>
          <label
            className={`${style.herdLabel} ${herd === "all" ? style.herdLabelSelect : ""}`}
          >
            <input
              type='radio'
              name='herd'
              value='all'
              checked={herd === "all"}
              className={style.hidden}
              onChange={e => setHerd(e.target.value)}
            />
            All
            <span className={` ${herd === "all" ? style.herdSpanSelect : ""}`}>
              {totalAnimalsCount}
            </span>
          </label>
          <label
            className={`${style.herdLabel} ${herd === "cow" ? style.herdLabelSelect : ""}`}
          >
            <input
              type='radio'
              name='herd'
              value='cow'
              checked={herd === "cow"}
              className={style.hidden}
              onChange={e => setHerd(e.target.value)}
            />
            Cow
            <span className={` ${herd === "cow" ? style.herdSpanSelect : ""}`}>
              {totalCowCount}
            </span>
          </label>
          <label
            className={`${style.herdLabel} ${herd === "calf" ? style.herdLabelSelect : ""}`}
          >
            <input
              type='radio'
              name='herd'
              value='calf'
              checked={herd === "calf"}
              className={style.hidden}
              onChange={e => setHerd(e.target.value)}
            />
            Calf
            <span className={` ${herd === "calf" ? style.herdSpanSelect : ""}`}>
              {totalCalfCount}
            </span>
          </label>
        </ul>
      </div>
      <div className={style.searchBox}>
        <div className={style.search}>
          <Search color='#616161' size={18} strokeWidth={3} />
          <input
            value={search}
            type='text'
            name='name'
            className={style.searchInput}
            placeholder='Search cow by name....'
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={style.filterIcon}>
          <ListFilter color='#373737' size={20} strokeWidth={3} />
        </div>
      </div>
      <div className={style.cowLists}>
        {/* /////////////////////////////////////////////////////////// */}
        {tempAnimalList.map(animal => {
          return (
            <div
              key={animal.id}
              className={style.cowList}
              onClick={() => {
                setAnimalId(animal.id);
                setOpenAnimal(true);
              }}
            >
              <div className={style.cowImageBox}>
                <img
                  className={style.cowImage}
                  src={animal.img}
                  alt='Cow Image'
                />
              </div>
              <div className={style.cowTexts}>
                <div className={style.cowNameAndCategories}>
                  <h3 className={style.cowName}>{animal.name}</h3>
                  <div className={style.cowCategories}>
                    <span>{animal.category}</span> •
                    <span>{animal.animalType}</span> •
                    <span>{animal.address}</span>
                  </div>
                </div>
                <div className={style.cowCapacity}>
                  {animal.litres ? `${animal.litres}L/day` : "Growing"}
                </div>
              </div>
              <div className={style.arrowRight}>
                <ChevronRight />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cows;
