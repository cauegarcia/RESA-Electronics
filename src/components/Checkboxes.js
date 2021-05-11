import React from "react";
import { stock } from "../stock";

const Checkboxes = ({ filter }) => {
  let filterComponent = new Set(
    stock.map((item) => {
      return item[filter];
    })
  );
  filterComponent = Array.from(filterComponent);
  return (
    <>
      {filterComponent.map((item, index) => {
        return (
          <article key={index}>
            <input type="checkbox" id={item} />
            <label htmlFor={item}>{item}</label>
          </article>
        );
      })}
    </>
  );
};

export default Checkboxes;
