const Joi = require("joi");

module.exports = (transaction) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    userId: Joi.number(),
    typeId: Joi.string().valid("expense", "income").required(),
    accountId: Joi.number(),
    categoryId: Joi.string(),
    note: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
  });
  return schema.validate(transaction);
};
