import React from "react";
import "../App.css";
import SongSingle from "./SongSingle";

const Songs = ({ items }) => {
  return (
    <div >
      {items.map((item, i) => (
        <SongSingle item={item} key={i} />
      ))}
    </div>
  );
};

export default Songs;
