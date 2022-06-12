require("dotenv").config();
const server = require("http").createServer();
const expressApp = require("./app");
const { connectDb } = require("./config/connectDB");

const PORT = process.env.PORT || 3002;

connectDb(process.env.MONGODB_URI).then(() => {
  console.log("SERVER CONNECTED TO MONGODB");
  server.on("request", expressApp);

  server.listen(PORT, () => {
    console.info(`SERVER IS RUNNING AT PORT ${PORT}`);
  });
  // startServer();
});

// var server
// function startServer() {
//   if (process.env.NODE_ENV === "production") {
//     const https_options = {
//       key: fs.readFileSync(config.ssl.key),
//       cert: fs.readFileSync(config.ssl.cert),
//     };
//     server = require("https").Server(https_options, expressApp.app);

//     server.listen(443, () => {
//       console.log("App is listening at port", 443);
//     });
//   } else {
//     server = require("http").Server(expressApp.app);

//     server.listen(80, () => {
//       console.log("App is listening at port", 80);
//     });
//   }
//   // startSocket();
// }
