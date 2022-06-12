const express = require("express");
const createError = require("http-errors");
const userRouter = require("./router/user");
const app = express();

app.get("/", function (req, res, next) {
  res.json("hello");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

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
