const mongoose = require("mongoose");
class Repository {
  constructor() {}

  static connect() {
    if (!process.env.MONGO_PASSWORD || !process.env.MONGO_USERNAME) {
      console.error(
        "Username / password for mongodb not defined! set credentials as environmental variable"
      );
      process.exit();
    }
    const dbUrl = `mongodb://${process.env.MONGO_USERNAME}:${
      process.env.MONGO_PASSWORD
    }@${process.env.MONGO_HOST}:27017/${
      process.env.MONGO_DATABASE
    }?authSource=admin`;

    mongoose.connect(dbUrl).then(
      () => {
        console.log("MongoDB: Connected to: " + dbUrl);
      },
      err => {
        console.error(err);
      }
    );
  }
}

module.exports = Repository;
