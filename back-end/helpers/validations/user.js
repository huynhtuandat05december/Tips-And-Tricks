const Joi = require("joi");

const userRegister = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return schema.validate(data);
};

module.exports = {
  userRegister,
};
