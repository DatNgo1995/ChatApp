const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const mongodbUri =
  "mongodb://test12345:test12345@ds121455.mlab.com:21455/heroku_x9d3p4j1";
const router = express.Router();
let mdb;
MongoClient.connect(mongodbUri, (err, db) => {
  console.log("Db connected");
  if (err) console.log(err.message);
  mdb = db;
});

router.get("/getData", async (req, res) => {
  let content = await mdb
    .collection("chat-message")
    .find()
    .toArray();
  res.send(content);
});

module.exports = router;