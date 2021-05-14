import React, { useEffect } from "react";
import style from "./checkout.module.css";
import DeliveryForm from "../components/DeliveryForm";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import CheckoutItem from "../components/CheckoutItem";
import StripeCheckoutButton from "../components/stripeButton";
import bubbleBlur from "../images/bubbleblur.png";
import bubbleSolid from "../images/bubblesolid.png";
import { useGlobalContext } from "../context";

const Checkout = () => {
  const { currentUser, cart, toggleCart } = useGlobalContext();

  useEffect(() => {
    toggleCart();
  }, [toggleCart]);
  if (currentUser) {
    const { displayName, email } = currentUser;
    const { total, items } = cart;
    return (
      <div className={style.checkoutWrapper}>
        <NavBar />
        <main>
          <div className={style.container}>
            <h4>Hello {displayName}, ready for checkout?</h4>
            <div className={style.emailWrapper}>
              <p>Email:</p>
              <p>{email}</p>
            </div>
            <DeliveryForm style={style} />
            <div className={style.checkoutHeader}>
              <div className={style.headerBlock}>
                <span>Product</span>
              </div>
              <div className={style.headerBlock}>
                <span>Name</span>
              </div>
              <div className={style.headerBlock}>
                <span>Quantity</span>
              </div>
              <div className={`${style.headerBlock} ${style.priceColor}`}>
                <span>Price</span>
                <span>Color</span>
              </div>
              <div className={style.headerBlock}>
                <span>Remove</span>
              </div>
            </div>
            {items.map((cartItem) => {
              return (
                <CheckoutItem key={cartItem.id} item={cartItem} style={style} />
              );
            })}
            <div className={style.total}>
              <span>TOTAL: ${total}</span>
            </div>
            <div className={style.testWarning}>
              *Please use the following test credit card for payment*
              <br />
              4242 4242 4242 4242 - Exp: 12/21 - CVV: 123
            </div>
            <StripeCheckoutButton price={total} />
          </div>
          <img src={bubbleBlur} alt="bubble-blur" className={style.blur} />
          <img src={bubbleSolid} alt="bubble-solid" className={style.solid} />
        </main>
        <Footer />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Checkout;
