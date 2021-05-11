import React from "react";
import style from "./about.module.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import photo from "../images/e-waste.jpg";
import logoWorld from "../images/world.png";
import bubbleBlur from "../images/bubbleblur.png";
import bubbleSolid from "../images/bubblesolid.png";

const About = () => {
  return (
    <div className={style.aboutWrapper}>
      <NavBar />
      <main className={style.container}>
        <nav className={style.navAbout}>
          <h1>
            About<span>us</span>
          </h1>
        </nav>
        <div className={style.presentation}>
          <p>
            Our company was established in 2017 in Hamilton CA by a group of
            friends concerned about the acceleration of the natural resources
            consumption and the amount of electronic waste piling up on the
            landfill areas. Then, we saw an apportunity to help the Planet by
            creating an online commerce which buy and sell second-hand products
            while making people aware of an important growing issue.
          </p>
          <div className={style.photoWrapper}>
            <img src={photo} alt="e-waste landfill" />
            <figcaption>
              Piles of e-waste in a landfill in South Africa
            </figcaption>
          </div>
        </div>
        <div className={style.supportLogoWrapper}>
          <p className={style.support}>
            We are pleased in providing financial support from part of our
            profits to NGO’s which defend or work to make the world a better
            place to live. A few organizations we support: <br />
            <span>www.savetheplanet.com</span>
            <br />
            <span>www.e-wastereduce.org</span>
            <br /> <span>www.lessoverconsumption.com</span>
          </p>
          <img
            src={logoWorld}
            alt="e-waste world"
            className={style.worldLogo}
          />
        </div>
        <img src={bubbleBlur} alt="bubble-blur" className={style.blur} />
        <img src={bubbleSolid} alt="bubble-solid" className={style.solid} />
      </main>
      <Footer />
    </div>
  );
};

export default About;
