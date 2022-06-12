const {
  register,
  login,
  testToken,
  refreshToken,
} = require("../controller/user");
const { verifyToken } = require("../services/JWT");

const router = require("express").Router();

router.post("/register", register);

router.post("/refresh-token", refreshToken);

router.post("/login", login);

router.post("/logout", (req, res, next) => {
  res.json("logout");
});

router.get("/test-token", verifyToken, testToken);

module.exports = router;
