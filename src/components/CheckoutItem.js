import React from "react";
import { useGlobalContext } from "../context";

const CheckoutItem = ({ item, style }) => {
  const { increaseAmount, decreaseAmount, removeItem } = useGlobalContext();
  const { nameShort, image, amount, price, id, color } = item;
  return (
    <div className={style.checkoutItem}>
      <div className={style.imageContainer}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/products/${image}`}
          alt="item"
        />
      </div>
      <span className={style.name}>{nameShort}</span>
      <span className={style.quantity}>
        <div
          className={style.arrow}
          onClick={() => {
            decreaseAmount(id, "cart");
          }}
        >
          &#10094;
        </div>
        <span className={style.value}>{amount}</span>
        <div
          className={style.arrow}
          onClick={() => {
            increaseAmount(id, "cart");
          }}
        >
          &#10095;
        </div>
      </span>
      <div className={style.priceWrapper}>
        <span>{price}</span>
        <span
          style={
            color === "white"
              ? {
                  color: `grey`,
                }
              : { color: `${color}` }
          }
        >
          {color.toUpperCase()}
        </span>
      </div>
      <div
        className={style.removeButton}
        onClick={() => {
          removeItem(id);
        }}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
