const {Types} = require('mongoose');

const User = require('../data-base/User');
const {customError: {ApiError}, messageEnum, statusEnum} = require('../errors');
const {PASSWORD_REGEX, EMAIL_REGEX} = require('../constants/regexp');

module.exports = {
    isBodyValid: (validator, type_request) => async (req, res, next) => {
        try {
            const {password, email, username} = req.body;

            const uniqueUsername = await User.findOne({username});

            if (uniqueUsername && type_request === 'create') {
                throw new ApiError(messageEnum.USERNAME_UNIQUE, statusEnum.CONFLICT);
            } else if (!PASSWORD_REGEX.test(password)) {
                throw new ApiError(messageEnum.PASSWORD_INVALID, statusEnum.BAD_REQUEST);
            } else if (!EMAIL_REGEX.test(email) && type_request === 'create') {
                throw new ApiError(messageEnum.INVALID_EMAIL, statusEnum.BAD_REQUEST);
            }

            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ApiError(error.details[0].message, statusEnum.BAD_REQUEST);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isExistEmail: async (req, res, next) => {
        try {
            const user = await User.findOne({email: req.body.email});

            if (user) {
                throw new ApiError(messageEnum.USER_EXIST, statusEnum.CONFLICT);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                throw new ApiError(messageEnum.USER_ID_VALID, statusEnum.NO_FOUND);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserType: (typeArr) => async (req, res, next) => {
        try {
            const {id} = req.params;

            const {user_type} = await User.findOne({_id: id});

            if (!typeArr.includes(user_type)) {
                throw new ApiError(messageEnum.ACCESS_DENIED, statusEnum.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
