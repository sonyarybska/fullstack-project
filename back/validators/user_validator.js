const Joi = require('joi');

const {ADMIN, DRIVER} = require('../constants/user-type.enum');
const {regExp: {EMAIL_REGEX, PASSWORD_REGEX}} = require('../constants');

const createUserValidator = Joi.object({
    username: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    first_name: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    last_name: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    email: Joi.string()
        .trim()
        .regex(EMAIL_REGEX)
        .required(),

    password: Joi.string()
        .min(8)
        .max(20)
        .trim()
        .regex(PASSWORD_REGEX)
        .required(),

    user_type: Joi.string()
        .trim()
        .required()
        .allow(ADMIN, DRIVER)
});

const updateUserValidator = Joi.object({
    first_name: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    last_name: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    password: Joi.string()
        .min(8)
        .max(20)
        .trim()
        .regex(PASSWORD_REGEX)
        .required(),

    user_type: Joi.string()
        .trim()
        .required()
        .allow(ADMIN, DRIVER)
});

module.exports = {createUserValidator, updateUserValidator};
