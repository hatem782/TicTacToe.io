import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Game from "./components/Game.jsx";

function App() {
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const [xo, setXo] = useState([]);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("CanJoin", (resp) => {
        setCanPlay(resp);
      });
      socket.on("Role", (resp) => {
        setRole(resp);
      });
      socket.on("xo", (resp) => {
        setXo(resp);
      });
      socket.on("winner", (resp) => {
        setWinner(resp);
      });
    }
  }, [socket]);

  return (
    <div className="App">
      {!role && canPlay ? <h1>waiting for 2nd player</h1> : null}
      {!canPlay ? <h1>Room is full</h1> : null}
      {role ? (
        <Game role={role} xo={xo} socket={socket} winner={winner} />
      ) : null}
    </div>
  );
}

export default App;
