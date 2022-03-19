import React, { useEffect } from "react";

import "./Game.css";

const Game = ({ role, xo, socket, winner }) => {
  const select = (x, y) => {
    console.log("hello");
    socket.emit("Turn", { x, y, role });
  };

  return (
    <div>
      <h1>Your role is {role}</h1>
      <h2> {winner === "" ? "" : `The winner is ${winner}`} </h2>
      <div className="game">
        {xo.map((line, x) => {
          return (
            <div key={x} className="line">
              {line.map((col, y) => {
                return (
                  <div
                    key={y}
                    className="colonne"
                    onClick={() => {
                      select(x, y);
                    }}
                  >
                    {col}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
