const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(user);
};
