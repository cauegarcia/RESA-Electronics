import React from "react";
import style from "./home.module.css";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import Caroussel from "../components/Caroussel";
import Footer from "../components/footer";

const Home = () => {
  const isHome = true;
  return (
    <div className={style.heroContainer}>
      <NavBar home={isHome} />
      <div className={style.heroWrapper}>
        <div className={style.heroDesc}>
          <h2>
            Reuse
            <br />
            Save Money
            <br />
            Save the Planet
            <br />
          </h2>
          <p>
            We sell high quality used products with affordable prices. Part of
            our profit is donated to support environmental causes
          </p>
          <div className={style.callAction}>
            <Link to="/products" className={style.actionLink}>
              See our Products
            </Link>
          </div>
        </div>
        <div className={style.heroCaroussel}>
          <div className={style.carousselWrapper}>
            <Caroussel style={style} />
          </div>
        </div>
      </div>
      <Footer home={isHome} />
    </div>
  );
};

export default Home;
