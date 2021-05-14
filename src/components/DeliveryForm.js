import React from "react";
import { AiFillEdit } from "react-icons/ai";

const DeliveryForm = ({ style }) => {
  const [address, setAddress] = React.useState({
    line1: "",
    line2: "",
    city: "",
    zip: "",
  });
  const [addressSubmitted, setAddressSubmitted] = React.useState({
    line1: "",
    line2: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;

    setAddress({ ...address, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddressSubmitted({
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      zip: address.zip,
    });
    setAddress({ line1: "", line2: "", city: "", zip: "" });
  };
  const handleEdit = () => {
    setAddress({
      line1: addressSubmitted.line1,
      line2: addressSubmitted.line2,
      city: addressSubmitted.city,
      zip: addressSubmitted.zip,
    });
    setAddressSubmitted({
      line1: "",
      line2: "",
      city: "",
      zip: "",
    });
  };
  if (!addressSubmitted.line1) {
    return (
      <div className={style.deliveryForm}>
        <h5>Please insert the delivery adress below</h5>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              name="line1"
              type="text"
              placeholder="Address line 1"
              value={address.line1}
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              name="line2"
              type="text"
              placeholder="Address line 2 (not required)"
              value={address.line2}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              name="city"
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              name="zip"
              type="text"
              placeholder="Postal Address"
              value={address.zip}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <button className={["btn", style.AddBtn].join(" ")}>
            Add delivery address
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={style.addressWrapper}>
        <div>
          <div>Delivery Address:</div>
          <div>
            <p>{addressSubmitted.line1}</p>
            <p>{addressSubmitted.line2}</p>
            <p>{addressSubmitted.city}</p>
            <p>{addressSubmitted.zip}</p>
          </div>
        </div>

        <button
          className={["btn", style.editBtn].join(" ")}
          onClick={() => handleEdit()}
        >
          <AiFillEdit />
        </button>
      </div>
    );
  }
};

export default DeliveryForm;
