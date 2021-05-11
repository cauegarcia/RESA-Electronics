import React from "react";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalContext } from "../context";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
const Cart = ({ style }) => {
  let {
    loggedIn,
    cart: { total, items },
    toggleModal,
    increaseAmount,
    decreaseAmount,
    removeItem,
    toggleCart,
    cartOpen,
  } = useGlobalContext();

  const checkLog = () => {
    if (loggedIn) {
      return <button className={style.checkoutBtn}>Checkout</button>;
    } else {
      return (
        <p>
          In order to checkout please
          <button className={style.loginBtn} onClick={toggleModal}>
            LOGIN
          </button>
        </p>
      );
    }
  };
  total = total.toFixed(2);
  return (
    <>
      <div className={style.cartWrapper}>
        <button className={style.btnCart} onClick={toggleCart}>
          <AiOutlineShoppingCart className={style.cart} />
        </button>
        <div className={style.cartAmount}>
          <p>{items.length}</p>
        </div>
      </div>
      <div
        className={`${
          !cartOpen
            ? [style.cartContainer, style.hideCart].join(" ")
            : style.cartContainer
        }`}
      >
        <button className={style.closeBtn} onClick={toggleCart}>
          <AiOutlineCloseCircle />
        </button>
        <h4 className={style.cartTitle}>CART</h4>
        <div className={style.cartItemsWrapper}>
          {items.map((item) => {
            const { nameShort, price, amount, image, id } = item;
            return (
              <div className={style.cartItemWrapper} key={id}>
                <div className={style.cartImageWrapper}>
                  <img
                    className={style.cartImage}
                    src={`${process.env.PUBLIC_URL}/assets/products/${image}`}
                    alt={nameShort}
                  />
                </div>
                <article>
                  <h4>{nameShort}</h4>
                  <p>${price}</p>
                  <button
                    onClick={() => {
                      removeItem(id);
                    }}
                  >
                    Remove
                  </button>
                </article>
                <div>
                  <button
                    onClick={() => {
                      increaseAmount(id, "cart");
                    }}
                  >
                    <BiUpArrow />
                  </button>
                  <h4>{amount}</h4>
                  <button
                    onClick={() => {
                      decreaseAmount(id, "cart");
                    }}
                  >
                    <BiDownArrow />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.totalWrapper}>
          <header>
            <h4>Total</h4>
            <h4>
              $<span>{total}</span>
            </h4>
          </header>
          <div className={style.checkoutBtnWrapper}>{checkLog()}</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
