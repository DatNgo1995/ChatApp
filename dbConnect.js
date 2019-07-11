const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const mongodbUri = process.env.MONGO_URI;

  module.exports = {
    connectDB : async() => {
      const db = await MongoClient.connect(mongodbUri);
      return db
    }
     
}