const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  mongoose
    .connect("mongodb+srv://taksha:ZEVVZ4Rd496rSvkc@cluster0.9iggj.mongodb.net/SPYKE?authSource=admin&replicaSet=atlas-jxnw5v-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(`Connected to Db`);
    })
    .catch((err) => {
      console.log(err);
    });
};
