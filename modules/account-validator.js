const Joi = require("joi");

module.exports = (account) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    typeId: Joi.string().valid("expense", "income").required(),
  });
  return schema.validate(account);
};
