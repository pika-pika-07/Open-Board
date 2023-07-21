const express = require("express"); // Access express server
//const socket = require("socket.io");
const cors = require("cors");
const app = express(); // Initialised and server ready
app.use(cors());
app.use(express.static("public"));
const port = process.env.PORT || 3000;

// listens and returns a server
let server = app.listen(port, () => {
  console.log("Listening tpo port" + port);
});

let io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// let io = socket(server);

/* 
    How it works
 1. FE(Client Computer) sends data to BE server 
 2. socket is connected to BE server
 3. Socket then transfers data to all the FE(Client computers) connected to it
*/

// As soon as connection is established from script in index.html
io.on("connection", (socket) => {
  // we get an instance of socket as param
  console.log("Made socket connection");
  // event listener triggers when beginPath i.e the identifier is triggered from the Frontend and it contains the data
  // Basically FE tranfers data to server via the socket
  // And the socket listens here
  // Till now data is recieved on BE server via the socket
  socket.on("beginPath", (data) => {
    // data is comiung from FE server via socket
    // Now socket will transfer all the data to connected CLient COmputers(FE server)
    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("undo", (data) => {
    io.sockets.emit("undo", data);
  });

  socket.on("redo", (data) => {
    io.sockets.emit("redo", data);
  });
});
