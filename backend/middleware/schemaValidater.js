const Joi = require("joi");

const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const RegisterSchema = Joi.object({
    firstname: Joi.string().min(2).max(60).required(),
    lastname: Joi.string().min(2).max(60).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

module.exports = {LoginSchema,RegisterSchema};  