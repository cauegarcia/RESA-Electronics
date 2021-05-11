import React from "react";
import style from "./modal.module.css";
import { useGlobalContext } from "../context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Alert from "./Alert";

const Modal = () => {
  const {
    modalOpen,
    toggleModal,
    register,
    toggleRegister,
    handlePerson,
    handleRegister,
    handleLogin,
    alert: { ...alert },
    person: { ...person },
  } = useGlobalContext();

  if (register) {
    return (
      <div
        className={`${
          modalOpen
            ? [style.modalWrapper, style.showModal].join(" ")
            : [style.modalWrapper]
        }`}
      >
        <button className={style.closeBtn} onClick={toggleModal}>
          <AiOutlineCloseCircle />
        </button>
        <div className={style.logIn}>
          <h3>REGISTER</h3>
          <form
            onSubmit={(e) => {
              handleRegister(e);
            }}
            id="registerForm"
          >
            <input
              onChange={(e) => {
                handlePerson(e);
              }}
              type="name"
              name="fullName"
              placeholder="Name"
              autoComplete="off"
              value={person.fullName}
              required
            />
            {alert.show && alert.caller === "name" && <Alert style={style} />}
            <input
              onChange={(e) => {
                handlePerson(e);
              }}
              type="email"
              placeholder="Email"
              autoComplete="off"
              name="email"
              value={person.email}
              required
            />
            {alert.show && alert.caller === "email" && <Alert style={style} />}
            <input
              onChange={(e) => {
                handlePerson(e);
              }}
              type="tel"
              placeholder="(XXX) XXX-XXXX"
              inputMode="numeric"
              name="phone"
              value={person.phone}
              required
            />
            {alert.show && alert.caller === "phone" && <Alert style={style} />}
            <input
              onChange={(e) => {
                handlePerson(e);
              }}
              type="password"
              placeholder="New password"
              autoComplete="off"
              name="password"
              value={person.password}
              required
            />
            {alert.show && alert.caller === "password" && (
              <Alert style={style} />
            )}
            <input
              onChange={(e) => {
                handlePerson(e);
              }}
              type="password"
              placeholder="Repeat password"
              autoComplete="off"
              name="confirmPassword"
              value={person.confirmPassword}
              required
            />
            {alert.show && alert.caller === "confirmPassword" && (
              <Alert style={style} />
            )}
            {alert.show && alert.caller === "register" && (
              <Alert style={style} />
            )}
            <button type="submit" className={style.loginBtn}>
              REGISTER
            </button>
          </form>
          <div className={style.needRegister}>
            <p>
              Already a member?{" "}
              <button onClick={toggleRegister}>Login here</button>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${
          modalOpen
            ? [style.modalWrapper, style.showModal].join(" ")
            : [style.modalWrapper]
        }`}
      >
        <button className={style.closeBtn} onClick={toggleModal}>
          <AiOutlineCloseCircle />
        </button>
        <div className={style.logIn}>
          <h3>SIGN IN</h3>
          <form
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              required
            />
            {alert.show && alert.caller === "invalidEmail" && (
              <Alert style={style} />
            )}
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
            />
            {alert.show && alert.caller === "invalidPassword" && (
              <Alert style={style} />
            )}
            {alert.show && alert.caller === "login" && <Alert style={style} />}
            <button type="submit" className={style.loginBtn}>
              LOGIN
            </button>
          </form>
          <div className={style.needRegister}>
            <p>
              Need to register?{" "}
              <button onClick={toggleRegister}>Click here</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
