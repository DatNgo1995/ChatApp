const express = require("express");
const dbAction = require("./dbConnect")

const router = express.Router();

router.get("/getData", async (req, res) => {
    const content = await dbAction(mdb => mdb 
        .collection("chat-message")
        .find()
        .toArray());
  res.send(content);
});

module.exports = router;