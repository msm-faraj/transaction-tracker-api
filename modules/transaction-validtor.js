const Joi = require("joi");

module.exports = (transaction) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    userId: Joi.string(),
    type: Joi.string().valid("expense", "income").required(),
    accountId: Joi.string(),
    categoryId: Joi.string(),
    note: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
  });
  return schema.validate(transaction);
};
