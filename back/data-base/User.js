const {model, Schema} = require('mongoose');

const {userTypeEnum: {ADMIN, DRIVER}} = require('../constants');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    first_name: {
        type: String,
        trim: true,
        required: true,
    },

    last_name: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        minlength: 8,
        required: true
    },

    user_type: {
        type: String,
        trim: true,
        required: true,
        default: 'user',
        enum: [
            ADMIN,
            DRIVER
        ]
    }
}, {
    timestamps: true
});

module.exports = model('user', UserSchema);

