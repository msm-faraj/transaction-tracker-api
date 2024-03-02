const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(3)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  return schema.validate(user);
};
