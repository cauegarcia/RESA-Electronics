import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../context";
const Tags = ({ style }) => {
  const { tagContent, deleteTag } = useGlobalContext();

  return (
    <div className={style.tagsWrapper}>
      {tagContent.map((tag) => {
        return (
          <button
            className={style.tagBtn}
            id={tag}
            onClick={(e) => {
              deleteTag(e);
            }}
          >
            {tag}
            <span>
              <AiOutlineClose />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tags;
