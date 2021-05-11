import React from "react";
import style from "./filter.module.css";
import Checkboxes from "./Checkboxes";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useGlobalContext } from "../context";

const Filter = () => {
  const { toggleFilter, submitFilter, clearFilter } = useGlobalContext();
  return (
    <div className={style.filterContainer}>
      <button className={style.closeBtn} onClick={toggleFilter}>
        <AiOutlineCloseCircle />
      </button>
      <form
        onSubmit={(e) => {
          submitFilter(e);
        }}
      >
        <input
          className={style.searchBar}
          type="text"
          placeholder="Search"
          id="search"
        />
        <h4>Price</h4>
        <div className={style.priceWrapper}>
          <label htmlFor="minPrice">
            min. <input type="number" id="minPrice" min="0"></input>
          </label>
          <label htmlFor="maxPrice">
            max. <input type="number" id="maxPrice" max="999"></input>
          </label>
        </div>
        <h4>Brand</h4>
        <div className={style.typeWrapper} id="brand">
          <Checkboxes filter={"brand"} />
        </div>
        <h4>Category</h4>
        <div className={style.typeWrapper} id="category">
          <Checkboxes filter={"category"} />
        </div>
        <h4>Condition</h4>
        <div className={style.typeWrapper} id="condition">
          <Checkboxes filter={"condition"} />
        </div>
        <div className={style.btnWrapper}>
          <button type="submit" className={["btn", style.filterBtn].join(" ")}>
            Apply
          </button>
          <button
            onClick={clearFilter}
            className={["btn", style.clearBtn].join(" ")}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
