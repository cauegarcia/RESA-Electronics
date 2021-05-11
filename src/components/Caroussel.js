import React, { useRef, useEffect } from "react";
import item1 from "../images/herocaroussel-1.png";
import item2 from "../images/herocaroussel-2.png";
import item3 from "../images/herocaroussel-3.png";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const Caroussel = ({ style }) => {
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);

  const goUp = () => {
    if (!input1.current) {
      return;
    }
    if (input1.current.checked) {
      input1.current.checked = false;
      input3.current.checked = true;
    } else if (input2.current.checked) {
      input2.current.checked = false;
      input1.current.checked = true;
    } else if (input3.current.checked) {
      input3.current.checked = false;
      input2.current.checked = true;
    }
    setTimeout(() => {
      goUp();
    }, 4000);
  };
  const goDown = () => {
    if (input1.current.checked) {
      input1.current.checked = false;
      input2.current.checked = true;
      return;
    }
    if (input2.current.checked) {
      input2.current.checked = false;
      input3.current.checked = true;
      return;
    }
    if (input3.current.checked) {
      input3.current.checked = false;
      input1.current.checked = true;
      return;
    }
    setTimeout(() => {
      goUp();
    }, 4000);
  };
  useEffect(() => {
    input1.current.checked = true;
    setTimeout(() => {
      goUp();
    }, 4000);
  }, []);
  return (
    <>
      <div className={style.radiosCaroussel}></div>
      <div className={style.imagesCaroussel}>
        <button className={style.btnUp} onClick={goUp}>
          <BiUpArrow />
        </button>
        <input
          type="radio"
          id="item1"
          className={style.item1}
          name="caroussel"
          ref={input1}
        ></input>
        <input
          type="radio"
          id="item2"
          className={style.item2}
          name="caroussel"
          ref={input2}
        ></input>
        <input
          type="radio"
          id="item3"
          className={style.item3}
          name="caroussel"
          ref={input3}
        ></input>
        <button className={style.btnDown} onClick={goDown}>
          <BiDownArrow />
        </button>
        <label htmlFor="item1" className={style.label1}>
          <img src={item1} alt="motorola-G6" />
        </label>
        <label htmlFor="item2" className={style.label2}>
          <img src={item2} alt="apple-watch" />
        </label>
        <label htmlFor="item3" className={style.label3}>
          <img src={item3} alt="notebook" />
        </label>
      </div>
    </>
  );
};

export default Caroussel;
