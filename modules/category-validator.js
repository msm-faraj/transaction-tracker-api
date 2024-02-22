const Joi = require("joi");

module.exports = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(category);
};
