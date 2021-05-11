import React from "react";
import { useGlobalContext } from "../context";

const Sort = ({ style }) => {
  const { selectSort } = useGlobalContext();
  return (
    <div>
      <select
        name="sort"
        id="sort"
        className={style.sort}
        onChange={(e) => {
          selectSort(e.target.value);
        }}
      >
        <option value="price-lowest">Price (lowest first)</option>
        <option value="price-highest">Price (highest first)</option>
        <option value="name-a">Name (A - Z)</option>
        <option value="name-z">Name (Z - A</option>
      </select>
    </div>
  );
};

export default Sort;
