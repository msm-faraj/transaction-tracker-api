const Joi = require("joi");

module.exports = (user) => {
  const schema = Joi.object({
    password: Joi.string()
      .min(6)
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$")
      ),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  return schema.validate(user);
};
