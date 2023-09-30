// As soon as we hit the url a socket connection with BE server will be established
// we can access io bec of the script tag above which includes socket cdn
// Connect socket on FE through CDN
// which eventually will connect to BE via below line

const isDev = false;
// process.env.NODE_ENV === "development";
const URL = isDev
  ? "http://localhost:3000"
  : "https://draw-board-vedw.onrender.com";
let socket = io.connect(URL); // Will connect it to socket in Backend i.e app.js
// so if we hit localhost:3000 in browser a socket connection will be established
// everytime we hit localhost:3000 in different browsers or chrome tabs a new connection will be established
