const { userRegister } = require("../helpers/validations/user");
const createError = require("http-errors");
const UserSchema = require("../models/user");
const { jsonResponse } = require("../helpers/ultis");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../services/JWT");
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userRegister(req.body);
    if (error) {
      throw createError[400](error.details[0].message);
    }

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      throw createError[400]("Email is ready been register");
    }
    const newUser = new UserSchema({
      email,
      password,
    });

    const response = await newUser.save();

    return res.json(jsonResponse(response));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = userRegister(req.body);
    if (error) {
      throw createError[400](error.details[0].message);
    }

    const existingUser = await UserSchema.findOne({ email });
    if (!existingUser) {
      throw createError.NotFound("Email not found");
    }
    const isValidPassword = existingUser.checkPassword(password);

    if (!isValidPassword) {
      throw createError.Unauthorized();
    }
    const accessToken = await signAccessToken({ userId: existingUser.id });
    const refreshToken = await signRefreshToken({ userId: existingUser.id });
    return res.json(jsonResponse({ accessToken, refreshToken }));
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const payload = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken({ userId: payload.userId });
    const newRefreshToken = await signRefreshToken({ userId: payload.userId });
    return res.json(
      jsonResponse({ accessToken, refreshToken: newRefreshToken })
    );
  } catch (error) {
    next(error);
  }
};

const testToken = (req, res, next) => {
  return res.json("hello");
};

module.exports = {
  register,
  login,
  testToken,
  refreshToken,
};
