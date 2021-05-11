import React from "react";
import style from "./footer.module.css";
import { social } from "../data";

const Footer = ({ home }) => {
  return (
    <section
      className={`${
        home ? [style.footer, style.footerHome].join(" ") : style.footer
      }`}
    >
      <p>@2021 - RASE LLC. All rights reserved.</p>
      <div className={style.social}>
        <ul>
          {social.map((link) => {
            const { id, url, icon } = link;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Footer;
