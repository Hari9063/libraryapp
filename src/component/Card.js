
import React from "react";
import "../App.css";

function Card({ title, desc }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>Explore</button>
    </div>
  );
}

export default Card;
