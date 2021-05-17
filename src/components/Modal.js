import React, { useCallback } from "react";
import style from "./modal.module.css";
import { useGlobalContext } from "../context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Alert from "./Alert";
import {
  signInWithGoogle,
  auth,
  createUserProfileDocument,
} from "../firebase/firebase.utils";

const Modal = () => {
  const {
    modalOpen,
    toggleModal,
    register,
    toggleRegister,
    handlePerson,
    handleRegister,
    handleLogin,
    resetPerson,
    formValid,
    displayAlert,
    toggleFormValid,
    alert: { ...alert },
    person: { ...person },
  } = useGlobalContext();
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });
  const onInputLoginChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setLoginInput({ ...loginInput, [name]: value });
  };
  const manageRegister = useCallback(async () => {
    const { email, fullName, password } = person;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName: fullName });
      resetPerson();
    } catch (error) {
      console.log(error);
    }
  }, [person, resetPerson]);

  React.useEffect(() => {
    if (formValid) {
      manageRegister();
      displayAlert({
        show: true,
        msg: "Register Succesful",
        type: "success",
        caller: "register",
      });
      toggleFormValid();
      setTimeout(() => {
        toggleModal();
      }, 2000);
    }
  }, [formValid, displayAlert, manageRegister, toggleFormValid, toggleModal]);
  const login = async (e) => {
    e.preventDefault();
    const { email, password } = loginInput;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setLoginInput({
        email: "",
        password: "",
      });
      handleLogin("success");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") handleLogin("password");
      if (error.code === "auth/user-not-found") handleLogin("email");
    }
  };
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
              e.preventDefault();
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
            <button type="submit" className={style.loginSingleBtn}>
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
              login(e);
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={loginInput.email}
              onChange={(e) => onInputLoginChange(e)}
              required
            />
            {alert.show && alert.caller === "invalidEmail" && (
              <Alert style={style} />
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={loginInput.password}
              onChange={(e) => onInputLoginChange(e)}
              required
            />
            {alert.show && alert.caller === "invalidPassword" && (
              <Alert style={style} />
            )}
            {alert.show && alert.caller === "login" && <Alert style={style} />}
            <button type="submit" className={style.loginSingleBtn}>
              LOGIN
            </button>
            <button
              type="button"
              onClick={async () => {
                await signInWithGoogle();
                handleLogin("success");
              }}
              className={style.loginGoogleBtn}
            >
              SIGN IN WITH GOOGLE
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
