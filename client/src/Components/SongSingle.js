import React from "react";
import "../App.css";

const SongSingle = ({ item }) => {
  return (
    <div >
      <div
        className="song-title"
        style={{ color: "#a7a19b", fontSize: "18px" }}
      >
        {" "}
        <span style={{ fontSize: "20px", color: "white" }}>
          {item.name}{" "}
        </span>
        <br></br>
        {item.artists[0].name}
      </div>
    </div>
  );
};

export default SongSingle;
