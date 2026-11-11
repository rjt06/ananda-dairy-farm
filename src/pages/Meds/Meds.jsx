import { useEffect, useRef, useState } from "react";
import style from "./Meds.module.css";
import app from "../../App.module.css";
import {
  ListFilter,
  Pill,
  Plus,
  Search,
  SquareExclamationPoint,
  Syringe,
  Trash,
} from "lucide-react";
import {
  addDocument,
  deleteDocument,
  getCollection,
} from "../../firebase/firestore";

function Meds({ medList, setMedList }) {
  const [openAddMed, setOpenAddMed] = useState(false);
  const [searchMed, setSearchMed] = useState("");
  const [medName, setMedName] = useState("");
  const [medPrice, setMedPrice] = useState("");
  const [medNote, setMedNote] = useState("");
  const addMedRef = useRef(null);

  useEffect(() => {
    getNewMedList();
  }, []);

  const openAddMedBox = () => {
    if (openAddMed) {
      setOpenAddMed(false);
      setTimeout(() => {
        addMedRef.current.style.opacity = 0;
      }, 10);
    } else {
      setOpenAddMed(true);
      setTimeout(() => {
        addMedRef.current.style.opacity = 1;
      }, 200);
    }
  };

  const getNewMedList = async () => {
    try {
      const list = await getCollection("meds");
      setMedList(list);
    } catch (error) {
      console.error(error);
    }
  };

  const submitMedForm = () => {
    console.log("Hello");
    setOpenAddMed(false);
    const newMeds = {
      medName: medName,
      medPrice: medPrice,
      medNote: medNote,
    };
    addDocument("meds", newMeds);
    setMedName("");
    setMedPrice("");
    setMedNote("");
    console.log("Medicine Listed");
    getNewMedList();
  };

  return (
    <>
      <div className={style.head}>
        <h3 className={style.heading}>Medicine Records</h3>
        <div
          className={` ${openAddMed ? style.plusIconBoxBig : style.plusIconBox}`}
        >
          <Plus
            className={`${openAddMed ? style.plusIconBig : style.plusIcon}`}
            onClick={openAddMedBox}
            color={openAddMed == true ? "#4c4b4b" : "white"}
            size={35}
            strokeWidth={3}
          />
          <div
            ref={addMedRef}
            className={`${openAddMed ? style.addMedBox : style.addMedBoxHidden}`}
          >
            <h3 className={style.addMedHeading}>Add Medicine</h3>
            <form
              action=''
              onSubmit={e => {
                e.preventDefault();
                submitMedForm();
              }}
            >
              <div className={style.nameAndPrice}>
                <div className={style.flexColumn}>
                  <label htmlFor='name' className={style.label}>
                    Medicine Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    autoComplete='off'
                    value={medName}
                    onChange={e => setMedName(e.target.value)}
                    className={style.input}
                    placeholder='e.g. medicine'
                    required
                  />
                </div>
                <div className={style.flexColumn}>
                  <label htmlFor='price' className={style.label}>
                    Medicine Price (₹)
                  </label>
                  <input
                    id='price'
                    type='number'
                    autoComplete='off'
                    value={medPrice}
                    onChange={e => setMedPrice(e.target.value)}
                    className={style.input}
                    placeholder='e.g. 650'
                    required
                  />
                </div>
              </div>
              <div className={style.textAreaBox}>
                <label htmlFor='medNote' className={style.labelTextarea}>
                  Write a NOTE for the Medicine (Optional)
                </label>
                <textarea
                  className={style.textarea}
                  name='medNote'
                  id='medNote'
                  rows={5}
                  value={medNote}
                  placeholder='Write something'
                  onChange={e => setMedNote(e.target.value)}
                  cols={40}
                ></textarea>
              </div>
              <button type='submit' className={style.saveMedBtn}>
                Save Medicine
              </button>
            </form>
          </div>
        </div>
        <div className={style.searchBox}>
          <div className={style.search}>
            <Search color='#616161' size={18} strokeWidth={3} />
            <input
              value={searchMed}
              type='text'
              name='name'
              className={style.searchInput}
              placeholder='Search medicine here....'
              onChange={e => setSearchMed(e.target.value)}
            />
          </div>
          <div className={style.filterIcon}>
            <ListFilter color='#373737' size={20} strokeWidth={3} />
          </div>
        </div>
      </div>
      <div className={`${style.meds} ${app.animateEnter}`}>
        {medList.length === 0 && (
          <div className={style.noMedicinesBox}>
            <div className={style.exclamationIconBox}>
              <SquareExclamationPoint size={50} color='red' strokeWidth={3} />
            </div>
            <h3>You haven't added any medicines yet</h3>
          </div>
        )}
        <ul className={style.medLists}>
          {medList.map(med => {
            return (
              <li className={style.medList} key={med.id}>
                <div className={style.listTop}>
                  <div className={style.first}>
                    <div className={style.iconBox}>
                      {Math.random() >= 0.5 ? (
                        <Pill color='rgb(0, 92, 153)' strokeWidth={3} />
                      ) : (
                        <Syringe color='rgb(0, 92, 153)' strokeWidth={3} />
                      )}
                    </div>
                    <div>
                      <div className={style.medName}>{med.medName}</div>
                      <div className={style.medPrice}>₹{med.medPrice}</div>
                    </div>
                  </div>
                  <div className={style.second}>
                    <Trash
                      color='rgb(0, 92, 153)'
                      strokeWidth={1}
                      size={20}
                      onClick={() => {
                        deleteDocument("meds", med.id);
                        getNewMedList();
                      }}
                    />
                  </div>
                </div>
                <div className={style.textArea}>{med.medNote}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Meds;
