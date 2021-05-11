import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Recommend = ({ style, id }) => {
  const { stock } = useGlobalContext();
  let itemCategory = stock.filter((item) => {
    return item.id === id;
  });
  itemCategory = itemCategory[0].category;

  const itemsToRecommend = stock.filter((item) => {
    return item.category === itemCategory && item.id !== id;
  });

  console.log(itemsToRecommend);
  return (
    <>
      {itemsToRecommend.map((item) => {
        return (
          <Link to={`/product/${item.id}`}>
            <div className={style.recItemWrapper}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/products/${item.image}`}
                alt={item.name}
                key={item.id}
              />
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default Recommend;
