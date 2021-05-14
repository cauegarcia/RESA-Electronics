import React from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "../images/logo.png";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IlgsIJJNL6tOKAmPRuGzt7lOKE8rod1GEHjKIRBotCI3FfeoFQJAU4M668pHnHg2l8TnLHhB9kUAGDKVfdDkROe00SDU06PKD";
  const onToken = (token) => {
    alert("Payment successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="RESA - Electronics"
      billingAddress
      image={logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
