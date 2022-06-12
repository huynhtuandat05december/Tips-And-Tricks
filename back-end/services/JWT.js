const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const signAccessToken = (payload) => {
  return new Promise((resolved, reject) => {
    const option = {
      expiresIn: "1h",
    };
    JWT.sign(
      payload,
      process.env.SECRET_ACCESS_TOKEN,
      option,
      (err, payload) => {
        if (err) {
          reject(err);
        }
        resolved(payload);
      }
    );
  });
};

const signRefreshToken = (payload) => {
  return new Promise((resolved, reject) => {
    const option = {
      expiresIn: "1y",
    };
    const token = JWT.sign(
      payload,
      process.env.SECRET_REFRESH_TOKEN,
      option,
      (err, payload) => {
        if (err) {
          reject(err);
        }
        resolved(payload);
      }
    );
  });
};

const verifyToken = (req, res, next) => {
  const headers = req.headers;
  if (!headers.authorization) {
    return next(createError.Unauthorized());
  }
  const bearerToken = headers.authorization.split(" ");
  if (bearerToken.length < 2) {
    return next(createError[400]("Header Authorization is not valid"));
  }
  const token = bearerToken[1];
  JWT.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, payload) => {
    if (err) {
      next(createError.Unauthorized());
    }
    req.payload = payload;
    next();
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolved, reject) => {
    JWT.verify(token, process.env.SECRET_REFRESH_TOKEN, (err, payload) => {
      if (err) {
        reject(err);
      }
      resolved(payload);
    });
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  verifyRefreshToken,
};
