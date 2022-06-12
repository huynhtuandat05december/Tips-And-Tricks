const mongoose = require("mongoose");

let cachedDb;

const connectToDatabase = (connectionString) => {
  if (
    cachedDb &&
    cachedDb.connections &&
    cachedDb.connections[0] &&
    cachedDb.connections[0].readyState
  ) {
    return Promise.resolve(cachedDb);
  }

  return mongoose
    .connect(connectionString)
    .then((db) => {
      cachedDb = db;
    })
    .then(() => cachedDb)
    .catch(() => {
      setTimeout(connectToDatabase, 3000);
    });
};
mongoose.connection.on("connected", () => {
  console.log(`MongoDB connected`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`MongoDB disconnected`);
});

mongoose.connection.on("error", () => {
  console.log(`MongoDB error`);
});

module.exports = {
  connectDb: connectToDatabase,
};
