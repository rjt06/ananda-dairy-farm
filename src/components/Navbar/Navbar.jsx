import { useRef } from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  const homeBox = () => {
    slideBox.current.className = `${style.slideBoxcss} ${style.homeBox}`;
  };
  const cowsBox = () => {
    slideBox.current.className = `${style.slideBoxcss} ${style.cowsBox}`;
  };
  const medsBox = () => {
    slideBox.current.className = `${style.slideBoxcss} ${style.medsBox}`;
  };
  const feedBox = () => {
    slideBox.current.className = `${style.slideBoxcss} ${style.feedBox}`;
  };

  const slideBox = useRef();

  const slideRemove = () => {
    slideBox.current.classList.remove(style.slide);
    void slideBox.current.offsetWidth;
    slideBox.current.classList.add(style.slide);
  };

  return (
    <div className={style.navbar}>
      <div className={style.slideBoxcss} ref={slideBox}></div>
      <ul className={style.innerNavbar}>
        <li>
          <Link
            to='/'
            className={style.navlink}
            onClick={() => {
              homeBox();
              slideRemove();
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/cows'
            className={style.navlink}
            onClick={() => {
              cowsBox();
              slideRemove();
            }}
          >
            Cows
          </Link>
        </li>
        <li>
          <Link
            to='/meds'
            className={style.navlink}
            onClick={() => {
              medsBox();
              slideRemove();
            }}
          >
            Meds
          </Link>
        </li>
        <li>
          <Link
            to='/feed'
            className={style.navlink}
            onClick={() => {
              feedBox();
              slideRemove();
            }}
          >
            Feed
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
