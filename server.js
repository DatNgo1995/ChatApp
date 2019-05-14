const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const socketIo = require("socket.io");
const server = express();
const ioServer = require("http").createServer(server);
const io = socketIo(ioServer);
const mongodbUri =
  "mongodb://test12345:test12345@ds121455.mlab.com:21455/heroku_x9d3p4j1";
const port = process.env.PORT || 8080;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
//Static file declaration
server.use(express.static(path.join(__dirname, "chat-app/build")));

//production mode
if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "chat-app/build")));
  //
  server.get("/", (req, res) => {
    res.sendfile(path.join((__dirname = "chat-app/build/index.html")));
  });
}

//build mode
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/chat-app/public/index.html"));
});

let mdb;
MongoClient.connect(mongodbUri, (err, db) => {
  console.log("Db connected");
  if (err) console.log(err.message);
  mdb = db;
});

const router = express.Router();

router.get("/getData", async (req, res) => {
  let content = await mdb
    .collection("chat-message")
    .find()
    .toArray();
  res.send(content);
});

server.use("/", router);

io.on("connection", socket => {
  console.log("user connected");
  socket.on("postMessage", async message => {
    mdb.collection("chat-message").insertOne(message);
    io.emit("serverSendPost", message);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
ioServer.listen(port, () =>
  console.log("Server connected with IO Socket available")
);
