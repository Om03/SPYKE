const Joi = require("joi");

exports.signupValidation = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});

exports.changePasswordValidation = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().required(),
  confirm_password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .required()
    .valid(Joi.ref("new_password")),
});

exports.forgotPassword = Joi.object({
  new_password: Joi.string().required(),
});