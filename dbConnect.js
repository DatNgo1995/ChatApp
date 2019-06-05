const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const mongodbUri = process.env.MONGO_URI;

  module.exports = async (callback) => {
    const mdb = await MongoClient.connect(mongodbUri);
    return callback(mdb);
  }