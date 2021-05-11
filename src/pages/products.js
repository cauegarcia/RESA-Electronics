import React from "react";
import style from "./products.module.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Tags from "../components/tags";
import Sort from "../components/sort";
import List from "../components/List";
import Filter from "../components/Filter";
import { useGlobalContext } from "../context";

const Products = () => {
  const { filterOpen, toggleFilter, filteredStock } = useGlobalContext();
  return (
    <div className={style.productsWrapper}>
      <NavBar />
      <main className={style.container}>
        <div className={style.contentWrapper}>
          <div>
            <Tags style={style} />
          </div>
          <div className={style.sortWrapper}>
            <div className={style.sortFilter}>
              <Sort style={style} />
              <button
                className={["btn", style.filterBtn].join(" ")}
                onClick={toggleFilter}
              >
                Filter
              </button>
            </div>
            <div className={style.line}></div>
            <div className={style.productsFound}>
              {filteredStock.length === 1
                ? `${filteredStock.length} Product found`
                : `${filteredStock.length} Products found`}
            </div>
          </div>
          <List style={style} />
        </div>
        <div
          className={`${
            filterOpen
              ? [style.filterWrapper, style.filterWrapperDesktop].join(" ")
              : style.filterWrapperDesktop
          }`}
        >
          <Filter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
