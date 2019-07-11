const express = require("express");
const dbAction = require("./dbConnect").dbAction



module.exports = router = (async () => {
  const mdb = await  require("./dbConnect").connectDB()
const router = express.Router();

router.get("/getData", async (req, res) => {
    const content = await mdb 
        .collection("chat-message")
        .find()
        .toArray()
  res.send(content);
});
  return router;
});