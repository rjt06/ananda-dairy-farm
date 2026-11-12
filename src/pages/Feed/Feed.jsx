import React from "react";
import { useEffect, useRef, useState } from "react";
import style from "./Feed.module.css";
import app from "../../App.module.css";
import {
  ListFilter,
  Pill,
  Plus,
  Search,
  Syringe,
  Trash,
  Wheat,
} from "lucide-react";
import {
  addDocument,
  deleteDocument,
  getCollection,
} from "../../firebase/firestore";
import EmptyList from "../../components/EmptyList/EmptyList";
import { formatDate } from "../../scripts/date";

function Feed({ feedList, setFeedList }) {
  const [openAddFeed, setOpenAddFeed] = useState(false);
  const [searchFeed, setsearchFeed] = useState("");
  const [feedName, setFeedName] = useState("");
  const [feedPrice, setFeedPrice] = useState("");
  const [feedDate, setFeedDate] = useState("");
  const addFeedRef = useRef(null);

  useEffect(() => {
    getNewFeedList();
  }, []);

  const openAddFeedBox = () => {
    if (openAddFeed) {
      setOpenAddFeed(false);
      setTimeout(() => {
        addFeedRef.current.style.opacity = 0;
      }, 10);
    } else {
      setOpenAddFeed(true);
      setTimeout(() => {
        addFeedRef.current.style.opacity = 1;
      }, 200);
    }
  };

  const getNewFeedList = async () => {
    try {
      const list = await getCollection("feed");
      setFeedList(list);
    } catch (error) {
      console.error(error);
    }
  };

  const submitFeedForm = () => {
    setOpenAddFeed(false);
    const newFeed = {
      feedName: feedName,
      feedPrice: feedPrice,
      feedDate: formatDate(feedDate),
    };
    addDocument("feed", newFeed);
    setFeedName("");
    setFeedPrice("");
    setFeedDate("");
    console.log("Feed Listed");
    getNewFeedList();
  };

  return (
    <>
      <div className={style.head}>
        <h3 className={style.heading}>Feed & Supplement</h3>
        <div
          className={` ${openAddFeed ? style.plusIconBoxBig : style.plusIconBox}`}
        >
          <Plus
            className={`${openAddFeed ? style.plusIconBig : style.plusIcon}`}
            onClick={openAddFeedBox}
            color={openAddFeed == true ? "#4c4b4b" : "white"}
            size={35}
            strokeWidth={3}
          />
          <div
            ref={addFeedRef}
            className={`${openAddFeed ? style.addFeedBox : style.addFeedBoxHidden}`}
          >
            <h3 className={style.addFeedHeading}>Add Feed or Supplement</h3>
            <form
              action=''
              onSubmit={e => {
                e.preventDefault();
                submitFeedForm();
              }}
            >
              <div className={style.nameAndPrice}>
                <div className={style.flexColumn}>
                  <label htmlFor='name' className={style.label}>
                    Feed Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    autoComplete='off'
                    value={feedName}
                    onChange={e => setFeedName(e.target.value)}
                    className={style.input}
                    placeholder='e.g. Tiwana 8000'
                    required
                  />
                </div>
                <div className={style.flexColumn}>
                  <label htmlFor='price' className={style.label}>
                    Feed Price (₹)
                  </label>
                  <input
                    id='price'
                    type='number'
                    autoComplete='off'
                    value={feedPrice}
                    onChange={e => setFeedPrice(e.target.value)}
                    className={style.input}
                    placeholder='e.g. 1500'
                    required
                  />
                </div>
              </div>
              <div className={style.dateInputBox}>
                <label htmlFor='feedDate' className={style.labelTextarea}>
                  Date
                </label>
                <input
                  id='feedDate'
                  type='date'
                  autoComplete='off'
                  value={feedDate}
                  onChange={e => setFeedDate(e.target.value)}
                  className={style.dateInput}
                  placeholder='Date'
                  required
                ></input>
              </div>
              <button type='submit' className={style.saveFeedBtn}>
                Save Feed
              </button>
            </form>
          </div>
        </div>
        <div className={style.searchBox}>
          <div className={style.search}>
            <Search color='#616161' size={18} strokeWidth={3} />
            <input
              value={searchFeed}
              type='text'
              name='name'
              className={style.searchInput}
              placeholder='Search feed here....'
              onChange={e => setsearchFeed(e.target.value)}
            />
          </div>
          <div className={style.filterIcon}>
            <ListFilter color='#373737' size={20} strokeWidth={3} />
          </div>
        </div>
      </div>
      <div className={`${style.feed} ${app.animateEnter}`}>
        {feedList.length === 0 && (
          <EmptyList messegeFor={"feed or supplement"} />
        )}
        <ul className={style.feedLists}>
          {feedList.map(feed => {
            return (
              <li className={style.feedList} key={feed.id}>
                <div className={style.listTop}>
                  <div className={style.first}>
                    <div className={style.iconBox}>
                      <Wheat color='rgb(173, 95, 0)' strokeWidth={2} />
                    </div>
                    <div>
                      <div className={style.feedName}>{feed.feedName}</div>
                      <div className={style.feedDate}>{feed.feedDate}</div>
                    </div>
                  </div>

                  <div className={style.feedPrice}>₹{feed.feedPrice}</div>
                  <div className={style.second}>
                    <Trash
                      color='rgb(137, 75, 0)'
                      strokeWidth={1}
                      size={20}
                      onClick={() => {
                        deleteDocument("feed", feed.id);
                        getNewFeedList();
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Feed;
