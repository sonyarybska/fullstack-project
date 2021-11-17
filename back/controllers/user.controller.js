const User = require('../data-base/User');
const {messageEnum, statusEnum} = require('../errors');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({})
                .lean()
                .select('-password');

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }

    },

    getUser: async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id});

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    postUser: async (req, res) => {
        try {
            await User.create({...req.body});

            res.status(statusEnum.CREATED).json(messageEnum.UPDATE_USER);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await User.updateOne({_id: req.params.id}, {...req.body});

            res.status(statusEnum.CREATED).json(messageEnum.UPDATE_USER);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;

            await User.deleteOne({_id: id});

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            res.json(e.message);
        }
    }
};
