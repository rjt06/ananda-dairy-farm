import { useEffect, useRef, useState } from "react";
import style from "./Cows.module.css";
import app from "../../App.module.css";
import { Camera, ChevronDown, ListFilter, Plus, Search } from "lucide-react";
import { imageUpload } from "../../scripts/uploadImage.js";
import Animal from "../../components/Animal/Animal";
import { addDocument, getCollection } from "../../firebase/firestore.js";

function Cows({ cowList, setCowList, totalAnimalsCountArr }) {
  const [search, setSearch] = useState("");
  const [openAddAnimal, setOpenAddAnimal] = useState(false);
  const [animalImage, setAnimalImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [litres, setLitres] = useState("");
  const [address, setAddress] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [openId, setOpenId] = useState(null);
  const [tempCowList, setTempCowList] = useState([]);
  const [herd, setHerd] = useState("all");
  const addCowRef = useRef(null);
  const cowTypeRef = useRef(null);
  const calfTypeRef = useRef(null);

  useEffect(() => {
    setTempCowList(cowList);
    if (cowList.length === 0) {
      getNewCowList();
    }
  }, []);

  useEffect(() => {
    sortList(cowList);
  }, [herd]);

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

  const sortList = animalList => {
    let sortedList;
    if (herd === "all") {
      sortedList = animalList;
    } else if (herd === "cow") {
      sortedList = animalList.filter(
        animal => animal.animalType.toLowerCase() === "cow",
      );
    } else if (herd === "calf") {
      sortedList = animalList.filter(
        animal => animal.animalType.toLowerCase() === "calf",
      );
    }
    setTempCowList(sortedList);
  };

  const getNewCowList = async () => {
    try {
      const list = await getCollection("cows");
      setCowList(list);
      setTempCowList(list);
    } catch (error) {
      console.error(error);
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
    const newAnimal = {
      img: imageUrl,
      name: name,
      price: price,
      date: date,
      category: category,
      litres: litres,
      animalType: animalType,
      address: address,
    };
    addDocument("cows", newAnimal);
    setAnimalImage(null);
    setName("");
    setPrice("");
    setDate("");
    setCategory("");
    setLitres("");
    setAddress("");
    console.log("Animal Listed");
    getNewCowList();
  };

  return (
    <>
      <div className={style.fixedTop}>
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
            strokeWidth={3}
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
                <button
                  className={`${style.btn} ${style.cowBtn}`}
                  type='submit'
                >
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
              <span
                className={` ${herd === "all" ? style.herdSpanSelect : ""}`}
              >
                {totalAnimalsCountArr[0]}
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
              Cows
              <span
                className={` ${herd === "cow" ? style.herdSpanSelect : ""}`}
              >
                {totalAnimalsCountArr[1]}
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
              Calves
              <span
                className={` ${herd === "calf" ? style.herdSpanSelect : ""}`}
              >
                {totalAnimalsCountArr[2]}
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
      </div>
      <div className={`${style.cows} ${app.animateEnter}`}>
        {/* {openAnimal ? (
          <Animal
            animalId={animalId}
            setOpenAnimal={setOpenAnimal}
            cowList={cowList}
          />
        ) : (
          ""
        )} */}

        <div className={style.cowLists}>
          {/* /////////////////////////////////////////////////////////// */}
          {tempCowList.map(animal => {
            return (
              <div className={style.outerCowList} key={animal.id}>
                <div
                  className={style.cowList}
                  onClick={() => {
                    setAnimalId(animal.id);
                    // setOpenAnimal(true);
                    setOpenId(openId === animal.id ? null : animal.id);
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
                  <div className={style.arrowDown}>
                    <ChevronDown />
                  </div>
                </div>
                {openId === animal.id && (
                  <Animal animalId={animalId} cowList={cowList} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cows;
