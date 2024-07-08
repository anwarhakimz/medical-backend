import Joi from "joi";

const registerValidation = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().max(100).email().required(),
  password: Joi.string().min(6).max(12).required(),
  gender: Joi.string().valid("male", "female"),
  role: Joi.string().default("patient").valid("patient", "doctor"),
  photo: Joi.optional(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerValidation, loginValidation };
