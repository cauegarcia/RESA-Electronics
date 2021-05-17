import React, { useEffect, useState } from "react";
import style from "./singleproduct.module.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Recommend from "../components/Recommend";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const SingleProduct = () => {
  const [currentColor, setCurrentColor] = useState("");
  let { id } = useParams();
  const {
    stock,
    amountToCart,
    increaseAmount,
    decreaseAmount,
    addToCart,
    toggleCart,
  } = useGlobalContext();
  id = parseInt(id);
  const [item] = stock.filter((item) => {
    if (item.id === id) return true;
    return false;
  });
  useEffect(() => {
    const initialCheck = Array.from(
      document.querySelectorAll(["input[type='radio']"])
    );
    initialCheck[0].checked = true;
    setCurrentColor(initialCheck[0].value);
  }, []);
  const updateColor = (e) => {
    const inputChecked = document.getElementById(e.target.htmlFor);
    setCurrentColor(inputChecked.value);
  };
  const checkColors = (colors) => {
    return colors.map((color, index) => {
      return (
        <React.Fragment key={index}>
          <input
            id={index}
            style={{ display: "none" }}
            type="radio"
            name="color"
            value={color}
            className={style.inputRadio}
          ></input>
          <label
            htmlFor={index}
            className={style.colorCircle}
            style={{ backgroundColor: `${color}` }}
            onClick={(e) => updateColor(e)}
          ></label>
        </React.Fragment>
      );
    });
  };
  return (
    <div className={style.singleProductWrapper}>
      <NavBar />
      <main className={style.container}>
        <div className={style.blackBg}></div>
        <Link to="/products" className={style.backProducts}>
          <AiOutlineLeft />
          <p>Back to Products</p>
        </Link>
        <div className={style.imgInfo}>
          <div className={style.imgWrapper}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/products/${item.image}`}
              alt={item.name}
            />
          </div>
          <div className={style.mainInfo}>
            <h3>{item.nameShort}</h3>
            <h4 className={style.price}>${item.price}</h4>
            <h4>Brand: {item.brand}</h4>
            <h4>Available: {item.available}</h4>
            <h4>Condition: {item.condition}</h4>
            <div className={style.colorsContainer}>
              <h4>Colors: </h4>
              <div className={style.colorsWrapper}>
                {checkColors(item.colors)}
              </div>
            </div>
            <h5>
              Color selected: {currentColor ? currentColor.toUpperCase() : ""}
            </h5>
            <div className={style.quantityContainer}>
              <button
                onClick={() => {
                  decreaseAmount(id, "ind");
                }}
              >
                <AiOutlineMinus />
              </button>
              <h4>{amountToCart}</h4>
              <button
                onClick={() => {
                  increaseAmount(id, "ind");
                }}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <button
              className={["btn", style.addBtn].join(" ")}
              onClick={() => {
                addToCart({ id: item.id, color: currentColor });
                toggleCart(true);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className={style.description}>
          <h4>Description</h4>
          <p>{item.description}</p>
        </div>
        <div className={style.recommendations}>
          <h4>You might also like:</h4>
          <div className={style.divRec}>
            <button>
              <AiOutlineLeft />
            </button>
            <div className={style.recWrapper}>
              <Recommend style={style} id={item.id} />
            </div>
            <button>
              <AiOutlineRight />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleProduct;
