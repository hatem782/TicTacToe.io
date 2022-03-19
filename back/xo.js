let xo = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currPlayer = "X";
let winner = "";
let players = [];
//let rooms = [];

PlayerJoined = (io, socket) => {
  const id = socket.id;
  if (players.indexOf(id) == -1 && players.length < 2) {
    socket.emit("CanJoin", true);
    players.push(id);
  } else if (players.length == 2) {
    socket.emit("CanJoin", false);
  }
  if (players.length == 2) {
    StartPlaying(io);
  }
};

StartPlaying = (io) => {
  io.to(players[0]).emit("Role", "X");
  io.to(players[1]).emit("Role", "O");
  EmmitXO(io);
};

Playing = (io, socket) => {
  socket.on("Turn", (data) => {
    //console.log(data);
    let { x, y, role } = data;
    if (role == currPlayer) {
      xo[x][y] = currPlayer;
      currPlayer = currPlayer == "X" ? "O" : "X";
      EmmitXO(io);
    }
  });
};

PlayerLeaved = (io, socket) => {
  const id = socket.id;
  players = players.filter((id2) => {
    return id2 !== id;
  });
  if (players.length < 2) {
    reset(io);
  }
  io.emit("PlayerLeaved", players);
};

EmmitXO = (io) => {
  players.forEach((player) => {
    io.to(player).emit("xo", xo);
  });
};

const reset = (io) => {
  xo = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  EmmitXO(io);
};

const posCurPlayer = () => {
  return currPlayer === "X" ? 0 : 1;
};

const posOldPlayer = () => {
  return currPlayer === "X" ? 1 : 0;
};

module.exports = {
  PlayerJoined,
  PlayerLeaved,
  Playing,
};
