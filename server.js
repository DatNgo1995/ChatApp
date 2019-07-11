const express = require("express");
const dbAction = require("./dbConnect").dbAction
let mdb = null;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const socketIo = require("socket.io");
const server = express();
const ioServer = require("http").createServer(server);
const io = socketIo(ioServer);
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




io.on("connection", socket => {
  console.log("user connected");
  let name = null;
  socket.on("online", async newUserName => {
    name = newUserName;
    const  userList = await mdb
      .collection("users")
      .find()
      .toArray();
      const  isNewUser = !userList.some(users => users.user === newUserName);
    if (isNewUser)
      await mdb.collection("users").insertOne({
        user: name,
        status: "online"
      }) 
    else
      await  mdb.collection("users").updateOne(
        { user: newUserName },
        {
          $set: {
            status: "online"
          }
        }
      )
      const  onlineList =  await mdb
      .collection("users")
      .find()
      .toArray()
    io.emit("updateOnline", onlineList );
  });
  socket.on("disconnect", async () => {
    console.log("user disconnected");
    await  mdb.collection("users").updateOne(
      { user: name },
      {
        $set: {
          status: "offline"
        }
      }
    )
    let onlineList = await mdb
      .collection("users")
      .find()
      .toArray()
    socket.emit("updateOnline", onlineList);
  });
  socket.on("postMessage", async message => {
    console.log("postMessage", message)
    const uuidv1 = require('uuid/v1')();

    await  mdb.collection("chat-message").insertOne({...message, id: uuidv1})
    io.emit("serverSendPost", message);
  });
  socket.on("editMessage", async message => {
    console.log("editMessage",message)
    await mdb.collection("chat-message").updateOne(
      { id: message.id },
      {
        $set: {
          content: message.content
        }
      }
    )
    io.emit("serverEditMessage", message)
  });
  socket.on("deleteMessage", async id => {
    await mdb.collection("chat-message").deleteOne({ id })
    io.emit("serverDeletePost", id);
  });
  
});

(async () => {
  
  mdb = await require("./dbConnect").connectDB()
  const router = await require("./router")();
  server.use("/", router);
  ioServer.listen(port, () =>
  console.log("Server connected with IO Socket available"))
}
 
)();
  






  