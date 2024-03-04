const Joi = require("joi");

module.exports = (transaction) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    userId: Joi.number().required(),
    typeId: Joi.number().required(),
    accountId: Joi.number().required(),
    categoryId: Joi.string().required(),
    note: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
  });
  return schema.validate(transaction);
};
