const MongoClient = require("mongodb").MongoClient;
const mongodbUri =
  "mongodb://test12345:test12345@ds121455.mlab.com:21455/heroku_x9d3p4j1";

  module.exports = async (callback) => {
    const mdb = await MongoClient.connect(mongodbUri);
    return callback(mdb);
  }