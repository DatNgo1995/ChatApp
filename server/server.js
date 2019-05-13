import express from 'express';
import config from './config';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';
const socketIo = require("socket.io");

const server = express();
const ioServer = require('http').createServer(server);
const io = socketIo (ioServer);

ioServer.listen(config.port, () => console.log("io test"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

  let mdb;
  MongoClient.connect(config.mongodbUri, (err, db) => {
      console.log("Db connected")
    mdb = db;
  });

  const router = express.Router();

  router.get("/getData", async (req, res) => {
    let content = await mdb.collection("chat-message").find().toArray();
    res.send(content);
  });
 
  server.use("/", router);

  io.on("connection",  socket => {
   console.log("user connected")
    socket.on("postMessage", async message => {
       mdb.collection("chat-message").insertOne(message);
      io.emit("serverSendPost", message);
    })
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    });