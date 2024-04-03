const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .pattern(new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{3,23}$")),
    password: Joi.string()
      .min(6)
      .required()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$")
      ),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  return schema.validate(user);
};
