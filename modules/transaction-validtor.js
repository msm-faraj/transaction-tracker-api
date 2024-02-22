const Joi = require("joi");

module.exports = (transaction) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(transaction);
};
