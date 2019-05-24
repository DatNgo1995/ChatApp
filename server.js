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
  let name;
  socket.on("online", async newUserName => {
    name = newUserName;
    let userList = await mdb
      .collection("users")
      .find()
      .toArray();
    let isNewUser = !userList.some(users => users.user === newUserName);
    if (isNewUser)
      await mdb.collection("users").insertOne({
        user: name,
        status: "online"
      });
    else
      await mdb.collection("users").updateOne(
        { user: newUserName },
        {
          $set: {
            status: "online"
          }
        }
      );
    let onlineList = await mdb
      .collection("users")
      .find()
      .toArray();
    io.emit("updateOnline", onlineList);
  });
  socket.on("postMessage", async message => {
    await mdb.collection("chat-message").insertOne(message);
    io.emit("serverSendPost", message);
  });
  socket.on("editMessage", async message => {
    await mdb.collection("chat-message").updateOne(
      { id: message.id },
      {
        $set: {
          content: message.content
        }
      }
    );
    io.emit("serverEditMessage", message)
  });
  socket.on("deleteMessage", async id => {
    await mdb.collection("chat-message").deleteOne({ id });
    io.emit("serverdDeletePost", id);
  });
  socket.on("disconnect", async () => {
    console.log("user disconnected");
    await mdb.collection("users").updateOne(
      { user: name },
      {
        $set: {
          status: "offline"
        }
      }
    );
    let onlineList = await mdb
      .collection("users")
      .find()
      .toArray();
    socket.emit("updateOnline", onlineList);
  });
});
ioServer.listen(port, () =>
  console.log("Server connected with IO Socket available")
);
