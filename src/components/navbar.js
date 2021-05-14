import React from "react";
import style from "./navbar.module.css";
import LinksNav from "./linksnav";
import logo from "../images/logo.png";
import Cart from "./cart";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useGlobalContext } from "../context";
import { auth } from "../firebase/firebase.utils";

const NavBar = ({ home }) => {
  const { menuOpen, toggleMenu, toggleModal, toggleLogin, loggedIn } =
    useGlobalContext();
  return (
    <nav
      className={`${home ? [style.nav, style.navHome].join(" ") : style.nav}`}
    >
      <Link to="/">
        <img src={logo} alt="resa" className={style.logo} />
      </Link>
      <div className={style.navLinks}>
        <LinksNav style={style} />
      </div>
      <div className={style.logincart}>
        <button
          className={style.login}
          onClick={() => {
            if (loggedIn) {
              auth.signOut();
            } else {
              toggleModal();
            }
          }}
        >
          {loggedIn ? "Logout" : "Login"}
        </button>
        <Cart style={style} />
      </div>
      <button className={style.menuBars} onClick={toggleMenu}>
        <AiOutlineMenu />
      </button>
      <div
        className={`${
          menuOpen
            ? [style.downMenuWrapper, style.showMenu].join(" ")
            : style.downMenuWrapper
        }`}
      >
        <LinksNav style={style} />
        <button
          onClick={() => {
            if (loggedIn) {
              toggleLogin();
            } else {
              toggleModal();
            }
          }}
        >
          {loggedIn ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
