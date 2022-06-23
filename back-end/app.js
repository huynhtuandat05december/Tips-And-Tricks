const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const createError = require("http-errors");
const userRouter = require("./router/user");

const app = express();

app.use(helmet()); // protected header
app.use(morgan("common")); // write log in console when request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res, next) {
  res.json("hello");
});

app.use("/api/v1/user", userRouter);

app.use((req, res, next) => {
  console.log("middleware");
  next(createError.NotFound("not found"));
});

app.use((err, req, res, next) => {
  console.log("run");
  res.json({
    errCode: err.status || 500,
    errDetail: err.message,
    data: null,
  });
});

module.exports = app;
