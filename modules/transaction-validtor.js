const Joi = require("joi");

module.exports = (transaction) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
  });
  return schema.validate(transaction);
};
