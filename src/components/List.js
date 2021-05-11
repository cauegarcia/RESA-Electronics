import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const List = ({ style }) => {
  const { filteredStock } = useGlobalContext();
  if (filteredStock.length > 0) {
    return (
      <div className={style.listWrapper}>
        {filteredStock.map((item) => {
          return (
            <article className={style.itemWrapper} key={item.id}>
              <div className={style.imgWrapper}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/products/${item.image}`}
                  alt={item.name}
                />
              </div>
              <div className={style.itemDesc}>
                <header>
                  <h4>{item.nameShort}</h4>
                  <p>
                    $<span>{item.price}</span>
                  </p>
                </header>
                <footer>
                  <p>{item.condition}</p>
                  <Link
                    className={["btn"]}
                    to={{
                      pathname: `/product/${item.id}`,
                      params: {
                        id: item.id,
                      },
                    }}
                    id={item.id}
                  >
                    VIEW
                  </Link>
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    );
  } else {
    return (
      <h4 className={style.noItems}>
        Sorry, no products found matching the filter criteria
      </h4>
    );
  }
};

export default List;
