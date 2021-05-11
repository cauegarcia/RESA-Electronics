import React from "react";
import { links } from "../data";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Linksnav = ({ style }) => {
  const { toggleMenu } = useGlobalContext();
  return (
    <ul>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <Link to={url} onClick={toggleMenu}>
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Linksnav;
